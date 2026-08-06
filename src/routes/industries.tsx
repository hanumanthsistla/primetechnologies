import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Enterprise AI in Banking, Manufacturing & Health | AI Pathways" },
      {
        name: "description",
        content:
          "Where applied AI, generative AI and agentic systems pay back: banking and insurance, manufacturing and supply chain, healthcare and life sciences, and the public sector.",
      },
      { property: "og:title", content: "Industries — AI Pathways" },
      {
        property: "og:description",
        content:
          "Enterprise AI use cases and constraints across financial services, manufacturing, healthcare and public sector.",
      },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: Industries,
});

const industries = [
  {
    name: "Banking & insurance",
    cases: ["Credit and fraud decisioning", "Claims triage assistants", "Regulatory reporting agents"],
    constraint:
      "Model risk management sign-off, explainability requirements and strict data residency.",
  },
  {
    name: "Manufacturing & supply chain",
    cases: ["Demand and spares forecasting", "Visual quality inspection", "Maintenance planning copilots"],
    constraint: "OT/IT separation, intermittent connectivity and edge inference constraints.",
  },
  {
    name: "Healthcare & life sciences",
    cases: ["Clinical documentation support", "Trial feasibility screening", "Pharmacovigilance triage"],
    constraint: "PHI handling, clinical safety cases and validated-system change control.",
  },
  {
    name: "Public sector & utilities",
    cases: ["Citizen service assistants", "Asset condition prediction", "Casework automation"],
    constraint: "Procurement transparency, accessibility standards and auditability of decisions.",
  },
];

function Industries() {
  return (
    <>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h1 className="max-w-3xl text-4xl font-semibold text-foreground md:text-5xl">
            The constraint, not the algorithm, decides what ships
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Every sector has a gate that kills AI projects late. We design for that gate from week
            one.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((i) => (
            <article key={i.name} className="rounded-lg border border-border bg-card p-7">
              <h2 className="text-xl font-semibold text-card-foreground">{i.name}</h2>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Typical use cases
              </p>
              <ul className="mt-3 space-y-2">
                {i.cases.map((c) => (
                  <li key={c} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">The gate: </span>
                {i.constraint}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 rounded-lg border border-border bg-secondary/50 p-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-muted-foreground">
            Not seeing your sector? The diagnostic works the same way — we start from your
            constraints, then look at use cases.
          </p>
          <Link
            to="/contact"
            className="inline-flex shrink-0 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}
