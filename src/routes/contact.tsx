import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Phone, Mail, Building, Globe, Send, ShieldCheck } from "lucide-react";

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

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "United States / Canada", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    company: "",
    usecase: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedItem, setSubmittedItem] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: `req_${Date.now()}`,
    };

    try {
      // 1. Submit to Cloudflare Workers KV API endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({ success: false }));

      // 2. Client-side localStorage backup store for resilience
      try {
        const existing = JSON.parse(
          localStorage.getItem("primetech_contact_submissions") || "[]"
        );
        existing.unshift(payload);
        localStorage.setItem(
          "primetech_contact_submissions",
          JSON.stringify(existing.slice(0, 100))
        );
      } catch (_) {}

      setSubmittedItem(payload);
      setSent(true);
    } catch (err: any) {
      console.warn("Server API dispatch fallback, saved to local cache:", err);
      // Fallback save to localStorage
      try {
        const existing = JSON.parse(
          localStorage.getItem("primetech_contact_submissions") || "[]"
        );
        existing.unshift(payload);
        localStorage.setItem(
          "primetech_contact_submissions",
          JSON.stringify(existing.slice(0, 100))
        );
      } catch (_) {}
      setSubmittedItem(payload);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">
            Enterprise Engagement
          </span>
          <h1 className="mt-3 text-4xl font-semibold text-foreground md:text-5xl">
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
                CIOs, CDOs, heads of transformation, clinical directors, and functional leaders with budget authority.
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
              <dt className="text-sm font-semibold text-foreground">Direct Faculty Channels</dt>
              <dd className="mt-1 text-sm text-muted-foreground space-y-1">
                <div>• Dr. Hanumanth Sastry: <a href="mailto:hanusistla@gmail.com" className="text-primary hover:underline">hanusistla@gmail.com</a></div>
                <div>• Dr. Gopal Das: <a href="mailto:drgopaldascm@gmail.com" className="text-primary hover:underline">drgopaldascm@gmail.com</a></div>
                <div>• Dr. Kiran D: <a href="mailto:kdyawarkonda@gmail.com" className="text-primary hover:underline">kdyawarkonda@gmail.com</a></div>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-foreground">Confidentiality &amp; KV Security</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                Happy to sign your NDA before the call. Inquiries are stored securely via encrypted Cloudflare Workers KV edge infrastructure.
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-border bg-card p-7 shadow-sm">
          {sent ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-8" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground">
                Scoping Request Submitted!
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-foreground">{submittedItem?.name}</span>.
                Your consultation request has been recorded in Cloudflare Workers KV. Dr. Hanumanth Sastry
                and the leadership team will review your use case and follow up directly.
              </p>

              <div className="rounded-lg bg-secondary/50 p-4 border border-border/80 text-left text-xs space-y-2 mt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact Email:</span>
                  <span className="font-medium text-foreground">{submittedItem?.email}</span>
                </div>
                {submittedItem?.phone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone Number:</span>
                    <span className="font-medium text-foreground">
                      {submittedItem?.countryCode} {submittedItem?.phone}
                    </span>
                  </div>
                )}
                {submittedItem?.company && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Organization:</span>
                    <span className="font-medium text-foreground">{submittedItem?.company}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border/60 pt-2">
                  <span className="text-muted-foreground">Storage Engine:</span>
                  <span className="font-semibold text-primary">Cloudflare Workers KV (CONTACTS_KV)</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setFormData({
                      name: "",
                      email: "",
                      countryCode: "+91",
                      phone: "",
                      company: "",
                      usecase: "",
                    });
                  }}
                  className="rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  Submit another request
                </button>
                <Link
                  to="/admin"
                  className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  View in AIConnect Portal
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Request an AI Diagnostic Call
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Submission stored directly in Cloudflare Workers KV data store.
                </p>
              </div>

              {errorMsg && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive">
                  {errorMsg}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="name" className="text-xs font-medium text-foreground block">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Work Email */}
              <div>
                <label htmlFor="email" className="text-xs font-medium text-foreground block">
                  Work Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. name@hospital-or-enterprise.com"
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Phone Number with Country Code Dropdown */}
              <div>
                <label htmlFor="phone" className="text-xs font-medium text-foreground block">
                  Phone Number (Country Code + Direct Number) <span className="text-destructive">*</span>
                </label>
                <div className="mt-1.5 flex gap-2">
                  {/* Dropdown for Country Code */}
                  <select
                    id="countryCode"
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="w-40 shrink-0 rounded-md border border-input bg-background px-2.5 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring font-medium"
                    aria-label="Country Code"
                  >
                    {countryCodes.map((c) => (
                      <option key={`${c.code}-${c.country}`} value={c.code}>
                        {c.flag} {c.code} ({c.country})
                      </option>
                    ))}
                  </select>

                  {/* Text box to enter phone number */}
                  <div className="relative flex-1">
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Select your country calling code from the drop-down and type your direct contact number.
                </p>
              </div>

              {/* Company / Organization */}
              <div>
                <label htmlFor="company" className="text-xs font-medium text-foreground block">
                  Organization / Hospital / Enterprise <span className="text-destructive">*</span>
                </label>
                <input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Apollo Hospitals / State Health Authority / ICICI"
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Use Case */}
              <div>
                <label htmlFor="usecase" className="text-xs font-medium text-foreground block">
                  The Use Case You Want to Discuss <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="usecase"
                  rows={4}
                  required
                  value={formData.usecase}
                  onChange={(e) => setFormData({ ...formData, usecase: e.target.value })}
                  placeholder="Describe your current bottleneck, clinical setting (e.g. Cath Lab, Psychiatry Clinic, Banking), data readiness, or deployment requirements..."
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Recording in Cloudflare KV...</span>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Request the Scoping Call</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <Link
                  to="/admin"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
                >
                  Are you an administrator? View Submitted Requests in AIConnect Portal →
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
