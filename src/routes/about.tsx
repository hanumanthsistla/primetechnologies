import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — How AI Pathways Works with Enterprise Teams" },
      {
        name: "description",
        content:
          "AI Pathways is an applied AI delivery practice: senior engineers embedded with enterprise teams, fixed stage gates, your cloud and your IP.",
      },
      { property: "og:title", content: "About — AI Pathways" },
      {
        property: "og:description",
        content:
          "An applied AI delivery practice built around stage gates, governance and handover to your own team.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const principles = [
  {
    title: "A stop list is a deliverable",
    body: "Telling you which three use cases not to fund is usually worth more than building the fourth.",
  },
  {
    title: "Baselines before models",
    body: "If we cannot measure what today costs, we cannot claim an improvement. Baseline first, always.",
  },
  {
    title: "Handover is the finish line",
    body: "An engagement ends when your team can change, retrain and roll back the system without us.",
  },
  {
    title: "No invented numbers",
    body: "We publish client outcomes only with approval, baseline and measurement window attached.",
  },
];

function About() {
  return (
    <>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h1 className="max-w-3xl text-4xl font-semibold text-foreground md:text-5xl">
            An applied AI practice, not a research lab
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            We work with enterprise operating and technology leaders who are past the demo stage and
            need AI that clears security review, risk review and a budget committee.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">How we operate</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Small senior teams. No pyramid staffing, no discovery phase that produces only slides.
              Each engagement has a named delivery lead who stays through handover, and every phase
              has an exit gate where you can stop without stranded spend.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We build in your cloud tenancy against your data governance rules, and we document
              enough that an internal auditor or an incoming vendor can pick the system up cold.
            </p>
          </div>
          <div className="grid gap-5">
            {principles.map((p) => (
              <div key={p.title} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-card-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-lg border border-dashed border-border p-8">
          <h2 className="text-xl font-semibold text-foreground">Team and credentials</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Named delivery leads, their backgrounds and relevant certifications will be listed here.
            Enterprise buyers evaluate people as much as method, so this section stays empty until
            it can be accurate.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Ask about the team
          </Link>
        </div>
      </section>
    </>
  );
}
