import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Book an Enterprise AI Scoping Call | AI Pathways" },
      {
        name: "description",
        content:
          "Bring one AI use case to a 45-minute scoping call. We assess data readiness, regulatory exposure and expected payback, and tell you if it is fundable.",
      },
      { property: "og:title", content: "Contact — AI Pathways" },
      {
        property: "og:description",
        content:
          "Book a 45-minute enterprise AI scoping call: data readiness, risk exposure and payback assessed on one use case.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">
            Book a scoping call
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            45 minutes, no deck. Bring one use case and we will work through data readiness,
            regulatory exposure and what payback would require.
          </p>
          <dl className="mt-9 space-y-6">
            <div>
              <dt className="text-sm font-semibold text-foreground">Who this is for</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                CIOs, CDOs, heads of transformation and functional leaders with budget authority.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-foreground">What you leave with</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                A written go / no-go view on the use case and the shortest credible path to a
                production decision.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-foreground">Confidentiality</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                Happy to sign your NDA before the call. Nothing discussed is used in marketing.
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-border bg-card p-7">
          {sent ? (
            <div className="py-10 text-center">
              <h2 className="text-xl font-semibold text-card-foreground">Thanks — noted.</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                This form is not yet wired to a mailbox. Connect a backend and these enquiries will
                be stored and emailed to you automatically.
              </p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full name
                </label>
                <input
                  id="name"
                  required
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="company" className="text-sm font-medium text-foreground">
                  Company
                </label>
                <input
                  id="company"
                  required
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="usecase" className="text-sm font-medium text-foreground">
                  The use case you want to discuss
                </label>
                <textarea
                  id="usecase"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Request the call
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
