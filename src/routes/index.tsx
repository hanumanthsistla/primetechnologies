import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, GitBranch, Gauge, Mail, ExternalLink } from "lucide-react";
import hanumanthAsset from "../assets/dr-hanumanth-sastry.jpg.asset.json";
import gopalAsset from "../assets/dr-gopal-das.png.asset.json";
import kiranAsset from "../assets/dr-kiran-d.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Pathways — Applied AI, GenAI & Agentic Systems for Enterprises" },
      {
        name: "description",
        content:
          "We take enterprise AI use cases from business case to governed production: applied ML, generative AI and agentic workflows, delivered in 90-day increments.",
      },
      { property: "og:title", content: "AI Pathways — Applied AI for the Enterprise" },
      {
        property: "og:description",
        content:
          "From business case to governed production: applied ML, generative AI and agentic workflows for enterprise teams.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const pillars = [
  {
    icon: Gauge,
    title: "Applied ML that moves a P&L line",
    body: "Forecasting, pricing, risk scoring and quality inspection models tied to an owner, a baseline and a measured delta — not a notebook.",
  },
  {
    icon: GitBranch,
    title: "Generative & agentic workflows",
    body: "Retrieval-grounded assistants and multi-step agents wired into your systems of record, with human approval gates where the risk demands them.",
  },
  {
    icon: ShieldCheck,
    title: "Governance built in, not bolted on",
    body: "Evaluation harnesses, red-teaming, audit trails and model documentation aligned to EU AI Act and NIST AI RMF expectations.",
  },
];

const team = [
  {
    photo: hanumanthAsset.url,
    name: "Dr Hanumanth Sastry",
    role: "Professor (AIML)",
    email: "hanusistla@gmail.com",
    links: [
      {
        label: "Google scholar",
        url: "https://scholar.google.com/citations?hl=en&authuser=1&user=-Z66y_EAAAAJ",
      },
      {
        label: "Scopus",
        url: "https://www.scopus.com/authid/detail.uri?authorId=60557811900",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/dr-hanumanth-sastry-sistla-693031165/",
      },
      {
        label: "Academics",
        url: "https://www.dsu.edu.in/hanumanth-ss",
      },
    ],
  },
  {
    photo: gopalAsset.url,
    name: "Dr Gopal Das",
    role: "Professor (Psychiatry)",
    email: "drgopaldascm@gmail.com",
  },
  {
    photo: kiranAsset.url,
    name: "Dr Kiran D",
    role: "Associate Professor (Cardiology)",
    email: "kdyawarkonda@gmail.com",
  },
];

const steps = [
  {
    n: "01",
    title: "Diagnose",
    weeks: "Weeks 1–2",
    body: "Use-case shortlist scored on value, data readiness and regulatory exposure. You get a ranked portfolio and a go/no-go per case.",
  },
  {
    n: "02",
    title: "Prove",
    weeks: "Weeks 3–8",
    body: "One case built against production data with a defined success metric and an evaluation harness. Kill criteria agreed up front.",
  },
  {
    n: "03",
    title: "Industrialise",
    weeks: "Weeks 9–14",
    body: "Deployment into your cloud, monitoring, drift alerts, rollback paths and a runbook your team owns.",
  },
  {
    n: "04",
    title: "Hand over",
    weeks: "Ongoing",
    body: "Enablement for your engineers and analysts so delivery does not stay dependent on us.",
  },
];

function Home() {
  return (
    <>
      <section className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.22em] text-primary-foreground/70">
            Applied AI · Generative AI · Agentic AI
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-semibold md:text-6xl">
            Enterprise AI that survives contact with production.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Most enterprise AI stalls between the pilot and the P&amp;L. We work with operating and
            technology leaders to pick the few use cases worth funding, prove them against real
            data, and run them under governance your risk function will sign off.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Book a scoping call <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center rounded-md border border-primary-foreground/25 px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
            >
              See how we deliver
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="max-w-2xl text-3xl font-semibold text-foreground">
          Three things enterprise buyers actually need from an AI partner
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.title} className="rounded-lg border border-border bg-card p-6">
              <p.icon className="size-6 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold text-foreground">A 14-week path to production</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Fixed stage gates, so you can stop at the end of any phase without stranded spend.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="border-t-2 border-accent pt-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
                  {s.n} · {s.weeks}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-semibold text-foreground">The team behind the work</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Senior academics and clinicians who bring research depth and domain expertise to every
          engagement.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-lg border border-border bg-card flex flex-col justify-between"
            >
              <div>
                <img
                  src={member.photo}
                  alt={member.name}
                  className="aspect-[4/5] w-full object-cover object-top"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-card-foreground">{member.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                  >
                    <Mail className="size-3.5" />
                    {member.email}
                  </a>

                  {"links" in member && member.links && member.links.length > 0 && (
                    <div className="mt-4 border-t border-border/70 pt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Academic &amp; Research Profiles
                      </p>
                      <ul className="space-y-1.5 text-xs">
                        {member.links.map((link) => (
                          <li
                            key={link.label}
                            className="flex items-center justify-between gap-2 rounded-md bg-secondary/40 px-2.5 py-1.5 border border-border/50"
                          >
                            <span className="font-medium text-foreground">{link.label}:</span>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                            >
                              <span>View</span>
                              <ExternalLink className="size-3" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-lg border border-dashed border-border p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Results</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">
            Case studies with verified numbers are being added here.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We publish outcome metrics only where the client has approved them, with the baseline
            and measurement window stated. Nothing on this page is modelled or illustrative.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Have a use case in mind?</h2>
            <p className="mt-2 max-w-xl text-primary-foreground/80">
              Bring one. In 45 minutes we will tell you whether it is fundable, what data it needs,
              and what would have to be true for it to pay back.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            Book a scoping call <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
