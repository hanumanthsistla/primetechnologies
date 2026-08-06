import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Applied ML, Generative AI & Agentic Delivery | AI Pathways" },
      {
        name: "description",
        content:
          "Four enterprise engagements: AI portfolio diagnostic, applied ML delivery, generative AI assistants and agentic process automation — each with defined deliverables.",
      },
      { property: "og:title", content: "Solutions — AI Pathways" },
      {
        property: "og:description",
        content:
          "AI portfolio diagnostics, applied ML delivery, generative AI assistants and agentic automation for enterprise teams.",
      },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: Solutions,
});

const offers = [
  {
    title: "AI portfolio diagnostic",
    length: "2 weeks",
    for_: "CIO, CDO, transformation leads",
    deliverables: [
      "Use-case inventory scored on value, feasibility and regulatory exposure",
      "Data readiness assessment per candidate case",
      "Funding recommendation with a stop list",
    ],
  },
  {
    title: "Applied ML delivery",
    length: "8–14 weeks",
    for_: "Operations, supply chain, risk, pricing",
    deliverables: [
      "Model built and validated against a documented baseline",
      "MLOps pipeline in your cloud with monitoring and drift alerts",
      "Runbook and handover to your engineering team",
    ],
  },
  {
    title: "Generative AI assistants",
    length: "6–12 weeks",
    for_: "Service, legal, knowledge-heavy functions",
    deliverables: [
      "Retrieval architecture over your governed content sources",
      "Evaluation harness with accuracy, grounding and refusal metrics",
      "Access controls, logging and PII handling aligned to policy",
    ],
  },
  {
    title: "Agentic process automation",
    length: "10–16 weeks",
    for_: "Back office, finance, procurement",
    deliverables: [
      "Multi-step agents integrated with your systems of record",
      "Human approval gates and reversible actions by design",
      "Audit trail per action, exportable for internal audit",
    ],
  },
];

function Solutions() {
  return (
    <>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h1 className="max-w-3xl text-4xl font-semibold text-foreground md:text-5xl">
            Four engagements, each with a defined end state
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Scope, duration and deliverables are fixed before work starts. You always know what you
            own at the end of a phase.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {offers.map((o) => (
            <article key={o.title} className="rounded-lg border border-border bg-card p-7">
              <h2 className="text-xl font-semibold text-card-foreground">{o.title}</h2>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {o.length} · for {o.for_}
              </p>
              <ul className="mt-5 space-y-3">
                {o.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-lg border border-border bg-secondary/50 p-8">
          <h2 className="text-2xl font-semibold text-foreground">How we work with your teams</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Your cloud, your IP</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Everything is built in your tenancy. Code, prompts, evaluations and documentation
                transfer to you.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Model-agnostic</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Frontier, open-weight or classical — chosen on cost, latency and data residency, not
                a vendor relationship.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Embedded, not offshore-only</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Named senior engineers work alongside your team in your ceremonies and repos.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Discuss an engagement
          </Link>
        </div>
      </section>
    </>
  );
}
