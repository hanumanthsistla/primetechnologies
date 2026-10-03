import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// In-memory fallback if KV binding is not provisioned or during local dev
const fallbackSubmissions: Array<{
  id: string;
  timestamp: string;
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  usecase: string;
  status: string;
  ip: string;
}> = [];

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: any, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // -------------------------------------------------------------
      // 1. CLOUDFLARE WORKERS KV: SUBMIT CONTACT SCOPING REQUEST
      // -------------------------------------------------------------
      if (url.pathname === "/api/contact" && request.method === "POST") {
        try {
          const body = (await request.json()) as {
            name?: string;
            email?: string;
            countryCode?: string;
            phone?: string;
            company?: string;
            usecase?: string;
          };

          if (!body.name || !body.email) {
            return new Response(
              JSON.stringify({ success: false, error: "Name and work email are required." }),
              { status: 400, headers: { "content-type": "application/json" } }
            );
          }

          const id = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          const submission = {
            id,
            timestamp: new Date().toISOString(),
            name: body.name.trim(),
            email: body.email.trim(),
            countryCode: body.countryCode || "+91",
            phone: body.phone?.trim() || "",
            company: body.company?.trim() || "",
            usecase: body.usecase?.trim() || "",
            status: "New",
            ip: request.headers.get("cf-connecting-ip") || "remote",
          };

          // Access Cloudflare Workers KV binding (configured as CONTACTS_KV)
          const kv = env?.CONTACTS_KV || env?.KV;
          let kvSaved = false;

          if (kv && typeof kv.put === "function") {
            try {
              // 1. Store individual record by key
              await kv.put(`submission:${submission.timestamp}:${id}`, JSON.stringify(submission));

              // 2. Update consolidated summary list for high-speed retrieval
              const existingRaw = await kv.get("all_submissions_summary");
              let summaryList: any[] = [];
              if (existingRaw) {
                try {
                  summaryList = JSON.parse(existingRaw);
                } catch (_) {}
              }
              summaryList.unshift(submission);
              if (summaryList.length > 200) summaryList = summaryList.slice(0, 200);
              await kv.put("all_submissions_summary", JSON.stringify(summaryList));
              kvSaved = true;
            } catch (kvErr) {
              console.error("Cloudflare KV write error:", kvErr);
            }
          }

          // Always maintain in fallback storage as backup
          fallbackSubmissions.unshift(submission);
          if (fallbackSubmissions.length > 200) fallbackSubmissions.pop();

          return new Response(
            JSON.stringify({
              success: true,
              id,
              kvSaved,
              submission,
              message: "Scoping request saved successfully to Cloudflare Workers KV.",
            }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
                "cache-control": "no-store",
              },
            }
          );
        } catch (postError: any) {
          return new Response(
            JSON.stringify({ success: false, error: "Malformed request payload", details: postError.message }),
            { status: 400, headers: { "content-type": "application/json" } }
          );
        }
      }

      // -------------------------------------------------------------
      // 2. CLOUDFLARE WORKERS KV: ADMIN RETRIEVE REQUESTS & ANALYTICS
      // -------------------------------------------------------------
      if (url.pathname === "/api/admin/requests" && request.method === "GET") {
        const providedPassword =
          request.headers.get("x-admin-password") ||
          url.searchParams.get("password") ||
          request.headers.get("authorization")?.replace("Bearer ", "");

        if (providedPassword !== "sistla123") {
          return new Response(
            JSON.stringify({ success: false, error: "Unauthorized: Invalid Admin Password" }),
            { status: 401, headers: { "content-type": "application/json" } }
          );
        }

        const kv = env?.CONTACTS_KV || env?.KV;
        let submissions: any[] = [];
        let kvActive = false;

        if (kv && typeof kv.get === "function") {
          kvActive = true;
          try {
            const summaryRaw = await kv.get("all_submissions_summary");
            if (summaryRaw) {
              submissions = JSON.parse(summaryRaw);
            }

            // If summary list is empty, scan prefix
            if ((!submissions || submissions.length === 0) && typeof kv.list === "function") {
              const listRes = await kv.list({ prefix: "submission:" });
              if (listRes?.keys?.length > 0) {
                const records = await Promise.all(listRes.keys.map((k: any) => kv.get(k.name)));
                submissions = records
                  .filter(Boolean)
                  .map((r: string) => {
                    try {
                      return JSON.parse(r);
                    } catch (_) {
                      return null;
                    }
                  })
                  .filter(Boolean);
                submissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
              }
            }
          } catch (fetchErr) {
            console.error("Cloudflare KV read error:", fetchErr);
          }
        }

        // Merge with any fallback submissions
        if (fallbackSubmissions.length > 0) {
          const seen = new Set(submissions.map((s) => s.id));
          for (const s of fallbackSubmissions) {
            if (!seen.has(s.id)) {
              submissions.push(s);
            }
          }
          submissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }

        return new Response(
          JSON.stringify({
            success: true,
            kvActive,
            count: submissions.length,
            submissions,
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json",
              "cache-control": "no-store",
            },
          }
        );
      }

      // Default: Hand over to TanStack Start SSR entry
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
