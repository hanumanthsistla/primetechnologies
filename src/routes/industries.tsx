import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  FileText,
  Calendar,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Building2,
  Factory,
  Landmark,
  CheckCircle2,
  Layers,
  FolderKanban,
  AlertCircle,
  Stethoscope,
  Activity,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      {
        title:
          "Industries, Clinical AI Projects & Published Patents — Healthcare, Banking & Industry | AI Pathways",
      },
      {
        name: "description",
        content:
          "Enterprise AI verticals, clinical research projects (Precision Psychiatry, Cardiac Smart Glasses, NMC Simulation), and published Indian patents across Healthcare & Life Sciences, Banking, and Manufacturing.",
      },
      {
        property: "og:title",
        content: "Industries, Clinical AI Projects & Published Patents — AI Pathways",
      },
      {
        property: "og:description",
        content:
          "Enterprise AI use cases, constraints, clinical AI projects, and published patents across Healthcare & Life Sciences, Financial Services, and Manufacturing.",
      },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: Industries,
});

const clinicalProjects = [
  {
    id: "project-1",
    number: "Project-1",
    title: "Generative AI Powered Precision Psychiatry",
    subtitle: "Objective Neurobiological Markers & EEG Representation Learning",
    badge: "Precision Psychiatry Research",
    icon: Brain,
    linkedPatent: "202641025843 A",
    leadFaculty: "Dr. Hanumanth Sastry Sistla & Dr. Gopal Das",
    publicHealthContext:
      "According to the National Mental Health Survey of India (2015–16), approximately 14.3% of India's adult population—nearly 150 million individuals—suffer from mental disorders requiring active intervention. The individual treatment gap for mental disorders in India presently ranges from 70% to 92%, with acute shortages of mental health professionals, particularly in rural and semi-urban areas.",
    diagnosticLimitationsTitle:
      "Critical Limitations of Syndromic Classification (DSM-5, ICD-11)",
    diagnosticLimitationsText:
      "Contemporary psychiatric diagnosis relies predominantly on syndromic classifications based on subjective symptom clusters rather than objective neurophysiological markers. This categorical paradigm leads to high diagnostic uncertainty, medication non-response, and delayed care.",
    categoricalFlaws: [
      {
        title: "Diagnostic Uncertainty",
        desc: "Overlapping symptomatology across disorders with >60% comorbidity rates.",
      },
      {
        title: "Treatment Non-Response",
        desc: "30–50% of patients show inadequate therapeutic response to first-line medications.",
      },
      {
        title: "Delayed Intervention",
        desc: "Severe time lag between symptom onset and accurate diagnosis (average 10 to 15-year delay for bipolar disorder).",
      },
      {
        title: "Suboptimal Personalization",
        desc: "One-size-fits-all treatment protocols neglecting individual neurobiological heterogeneity.",
      },
    ],
    investigationScope:
      "This research work is conducted as an observational investigation to evaluate the use of generative artificial intelligence (AI) and machine learning (ML) models for representation learning and inference in precision psychiatry. The objective is to assess whether Generative AI methods applied to electroencephalography (EEG)–derived features can identify latent neurophysiological patterns relevant to psychiatric classification and individual treatment outcome prediction.",
    tags: [
      "EEG Representation Learning",
      "Digital Phenotyping",
      "Latent Neurophysiology",
      "National Mental Health Survey India",
      "Bipolar Biomarkers",
      "Personalized Protocols",
    ],
  },
  {
    id: "project-2",
    number: "Project-2",
    title:
      "Generative AI Platform for Real-Time Cardiac Clinical Decision Support and Procedural Guidance",
    subtitle: "Hands-Free Smart Interventional Glasses in High-Acuity Cardiac Environments",
    badge: "Interventional Cardiology AI",
    icon: Stethoscope,
    linkedPatent: "IN202641041350 A1",
    leadFaculty: "Dr. Hanumanth Sastry Sistla & Dr. Kiran Kumar Ramesh Dyawarkonda",
    publicHealthContext:
      "Cardiovascular diseases remain one of the leading causes of mortality worldwide. Rapid and accurate clinical decision-making is critical in emergency cardiac care environments such as cardiac catheterization laboratories (cath labs), intensive care units (ICUs), and emergency departments.",
    diagnosticLimitationsTitle:
      "Data Fragmentation & Procedural Workflow Bottlenecks",
    diagnosticLimitationsText:
      "Interventional procedures require clinicians to synthesize massive, disparate patient streams in seconds. Traditional clinical decision support systems are screen-based, disconnected from operative workflows, and cannot provide real-time intra-procedural guidance without sterile field disruption.",
    categoricalFlaws: [
      {
        title: "Multi-Stream Data Overload",
        desc: "High cognitive load processing 12-lead ECG, echocardiography, hemodynamics, lab values, and history simultaneously.",
      },
      {
        title: "Screen-Based Disconnection",
        desc: "Conventional monitors require looking away from sterile operative fields and catheter manipulation.",
      },
      {
        title: "Lack of Real-Time Guidance",
        desc: "No contextual in-procedure procedural navigation or dynamic risk adaptation during acute events.",
      },
      {
        title: "Complex Subspecialty Demands",
        desc: "High variability across paediatric cardiology, adult congenital heart disease, and structural valve replacements.",
      },
    ],
    investigationScope:
      "The system integrates wearable smart glasses technology, augmented clinical visualization, and Generative AI-enabled analytics to assist clinicians during complex cardiac procedures. The proposed platform incorporates an AIML-based decision support engine integrating multimodal data (ECG waveforms, clinical records, imaging, physiological parameters) to provide AI-assisted ECG interpretation, predictive risk scoring, and evidence-based clinical protocol recommendations for emergency care (ACLS, post-ROSC) and catheter-based interventions (angiography, PCI, structural interventions).",
    tags: [
      "Smart Interventional Glasses",
      "Catheter Navigation",
      "Real-Time 12-Lead ECG",
      "Structural Heart Interventions",
      "Paediatric Cardiology",
      "Bailout Decision Support",
    ],
  },
  {
    id: "project-3",
    number: "Project-3",
    title:
      "Generative AI-Driven Multi-Agent Simulation for Certifiable Psychiatric Skills Training in Suicide Risk Assessment",
    subtitle: "NMC Competency-Based Medical Education (CBME) Simulation Platform",
    badge: "NMC Skills Simulation AI",
    icon: Activity,
    linkedPatent: "202641098894 A",
    leadFaculty: "Dr. Gopal Das CM & Dr. Hanumanth Sastry Sistla",
    publicHealthContext:
      "Suicide risk assessment is widely regarded as one of the most complex clinical skills in psychiatric training. Unlike psychomotor competencies in procedural specialties, it depends on nuanced observation, empathic communication, attitudinal calibration, and structured interview-based judgement under emotionally difficult conditions.",
    diagnosticLimitationsTitle:
      "National Medical Commission (NMC) Mandates & Training Bottlenecks",
    diagnosticLimitationsText:
      "India's National Medical Commission (NMC) introduced Competency-Based Medical Education (CBME) framing psychiatric training around explicit Specific Learning Objectives (SLOs) and Attitude-Ethics-Communication (AETCOM) competencies. However, traditional training with real patients or standardized actors is logistically and ethically unrealistic at scale, risks novice mismanagement of crises, and fails to expose learners to the full clinical spectrum of suicide presentations.",
    categoricalFlaws: [
      {
        title: "Director / Orchestrator Agent",
        desc: "Generates clinically coherent, diverse scenarios from a multidimensional parameter space (context, urgency, suicide spectrum, comorbidity, moderating factors).",
      },
      {
        title: "Patient Simulator Agent",
        desc: "Conducts adaptive, context-sensitive, multi-turn clinical interviews via text and voice, emulating authentic psychiatric presentations.",
      },
      {
        title: "Objective Evaluator Agent",
        desc: "Scores trainee interview performance objectively against predefined learning objectives (SLOs) and clinical rubrics with structured feedback.",
      },
      {
        title: "Independent Validating & Safety Agent",
        desc: "Supervises scenario coherence and evaluation accuracy, with controlled human-in-the-loop expert escalation for low-confidence or unsafe outputs.",
      },
    ],
    investigationScope:
      "Discloses a multi-agent Generative AI simulation framework for scalable, repeatable, and ethically safe clinical training. Eliminates patient risk while exposing trainees to diverse, clinically valid suicide presentations. The architecture integrates continuous learning loops via clinician feedback (RLHF), longitudinal competency analytics, and extensibility to animated avatars, virtual-reality (VR), and 3D simulation environments.",
    tags: [
      "Multi-Agent AI Architecture",
      "NMC CBME Competencies",
      "Suicide Risk Assessment",
      "Adaptive Patient Simulator",
      "Clinical Rubric Evaluator",
      "Human-in-the-Loop Safety",
    ],
  },
];

const publishedPatents = [
  {
    id: "patent-cardiac-ar",
    publicationNo: "IN202641041350 A1",
    applicationNo: "202641041350",
    filingDate: "31-03-2026",
    publicationDate: "17-04-2026",
    journalNo: "16/2026",
    office: "Intellectual Property Office, India",
    title:
      "Generative AI Platform for Real-Time Cardiac Clinical Decision Support and Procedural Guidance using Smart Interventional Glasses",
    classification:
      "A61B 5/00, A61B 5/0205, G16H 40/63, A61B 5/0402, A61B 5/021",
    applicants: [
      "Hanumanth Sastry Sistla",
      "Dr Kiran Kumar Ramesh Dyawarkonda",
    ],
    inventors: [
      {
        name: "Dr. Hanumanth Sastry Sistla",
        designation: "Professor CSE (AIML), DSU, Bangalore",
      },
      {
        name: "Dr. Kiran Kumar Ramesh Dyawarkonda",
        designation:
          "Associate Professor / Asst. Professor Cardiology, CDSIMER, DSU, Bangalore",
      },
    ],
    highlight: "Cardiology & Interventional AR AI",
    summary:
      "A Generative AI platform for real-time cardiology decision support and procedural guidance across emergency and interventional settings using smart interventional glasses. The system integrates a wearable head-mounted device with integrated camera, display, microphones, and wireless connectivity, coupled with a multimodal LLM engine that ingests 12-lead ECG waveforms, vital signs, echocardiography/angiography imaging, and structured clinical parameters.",
    keyCapabilities: [
      "Hands-free AR procedural navigation for emergency cardiac care (ACLS, post-ROSC) and catheter-based interventions (coronary angiography, PCI, structural valve replacements).",
      "AI-assisted 12-lead ECG waveform interpretation, arrhythmia classification, and automated cardiovascular risk scoring.",
      "Dynamic complication recognition, procedural bailout guidance, secure tele-mentoring, and remote proctoring overlays.",
      "Hybrid low-latency edge inference (ARM / Qualcomm XR / NVIDIA Jetson) coupled to cloud GPU retraining with QLoRA & RLHF.",
      "Blockchain ledger integration for tamper-proof EHR records, model-selection metadata, and regulatory compliance audit trails.",
    ],
    tags: [
      "Smart Interventional Glasses",
      "Multimodal LLM",
      "12-Lead ECG",
      "Catheter Navigation",
      "Bailout Guidance",
      "Edge AI Inference",
      "Blockchain EHR",
    ],
  },
  {
    id: "patent-psychiatry-nmc",
    publicationNo: "202641098894 A",
    applicationNo: "202641098894",
    filingDate: "15-08-2026",
    publicationDate: "21-08-2026",
    journalNo: "The Patent Office Journal No. 34/2026, Page 105943",
    office: "Intellectual Property Office, India",
    title:
      "Generative AI Driven Simulation-Based Training System and Method for Certifiable NMC Psychiatry Skills in Suicide Risk Assessment",
    classification:
      "G09B 19/00, G09B 7/00, G09B 7/04, G09B 7/02, G09B 5/06",
    applicants: ["Hanumanth Sastry Sistla"],
    inventors: [
      {
        name: "Dr. Gopal Das CM",
        designation: "Professor (Psychiatry)",
      },
      {
        name: "Hanumanth Sastry Sistla",
        designation: "Professor CSE (AIML), Applicant & System Architect",
      },
    ],
    highlight: "Psychiatry Simulation & NMC Competency",
    summary:
      "A Generative AI-driven simulation-based training system for scalable training and competency assessment of certifiable psychiatry skills, particularly suicide risk assessment aligned with National Medical Commission (NMC) standards. The architecture generates configurable simulated patient encounters by varying clinical, psychosocial, ideational, motivational, and volitional parameters.",
    keyCapabilities: [
      "Dynamic scenario parameter engine orchestrating configurable simulated patient cases with adaptive text and voice interactions.",
      "Multi-agent architecture featuring Director/Orchestrator Agent, Patient Simulator Agent, Objective Evaluator Agent, and Safety Agent.",
      "Objective assessment of learner performance against predefined learning objectives, clinical knowledge rubrics, and structured feedback.",
      "Independent validation agent with human-in-the-loop expert escalation and anti-hallucination safety filters for sensitive clinical scenarios.",
      "Repeatable clinical simulations with longitudinal competency analytics, expandable to VR and 3D animated avatars.",
    ],
    tags: [
      "Precision Psychiatry",
      "NMC Competency Certification",
      "Suicide Risk Assessment",
      "Multi-Agent System",
      "Patient Simulation",
      "Clinical Safety Filter",
      "VR / 3D Simulation",
    ],
  },
  {
    id: "patent-precision-psychiatry-biomarkers",
    publicationNo: "202641025843 A",
    applicationNo: "202641025843",
    filingDate: "05-03-2026",
    publicationDate: "20-03-2026",
    journalNo: "The Patent Office Journal No. 12/2026, Page 32530",
    office: "Intellectual Property Office, India",
    title:
      "Biomarkers and Generative Inference based Precision Psychiatry System and Method Thereof",
    classification:
      "G16H 50/20, G16H 10/60, G16H 50/70, G16H 20/70, G06N 5/04",
    applicants: ["Dayananda Sagar University (DSU)"],
    inventors: [
      {
        name: "Dr. Hanumanth Sastry Sistla",
        designation: "Professor CSE (AIML), DSU (Lead Inventor)",
      },
      {
        name: "Dr. Gopal Das",
        designation: "Professor (Psychiatry), DSU",
      },
      {
        name: "Co-Inventors: Jayavrinda V V, Bahubali S, Senthil Kumar A, M Lakshmanan, Abdul Haq N, Joshuva Arockia D, Sriramkumar R",
        designation: "Faculty & Researchers, DSU",
      },
    ],
    highlight: "Precision Psychiatry & Biomarker AI",
    summary:
      "A precision psychiatry platform for personalized diagnosis, prognosis, and treatment of psychological disorders using machine learning and generative artificial intelligence. The system integrates multimodal neurocognitive and digital biomarkers, personalized digital phenotyping, and privacy-preserving retrieval-augmented generation (RAG) with automated de-identification applied prior to embedding to guarantee zero identity leakage.",
    keyCapabilities: [
      "Multimodal integration of neurocognitive signals, digital biomarkers, and personalized digital phenotyping.",
      "Privacy-preserving RAG engine with automated patient de-identification applied prior to vector embedding.",
      "Hybrid multi-model routing layer dynamically balancing privacy constraints, reasoning complexity, and latency.",
      "Clinical safety and escalation engine coupled to clinical rules for real-time treatment guidance and physician oversight.",
      "Enforceable patient consent via smart contracts with blockchain-anchored audit mechanisms for tamper-resistant decision traceability.",
      "Continuous drift monitoring and clinician-in-the-loop reinforcement learning from human feedback (RLHF) with multimodal, multilingual support.",
    ],
    tags: [
      "Precision Psychiatry",
      "Digital Biomarkers",
      "Neurocognitive AI",
      "Privacy-Preserving RAG",
      "Model Router",
      "Blockchain Consent",
      "Clinician-in-the-Loop RLHF",
    ],
  },
];

const industriesList = [
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: HeartPulse,
    cases: [
      "Real-time catheter lab interventional decision support and AR navigation",
      "Certifiable psychiatry simulation training and suicide risk assessment (NMC aligned)",
      "Clinical documentation automation and trial feasibility screening",
      "Pharmacovigilance triage and multi-modal diagnostic signal synthesis",
    ],
    constraint:
      "PHI handling, clinical safety cases, regulatory explainability (NMC/FDA/CDSCO), and validated-system change control.",
  },
  {
    id: "banking",
    name: "Banking & Insurance",
    icon: Landmark,
    cases: [
      "Credit decisioning and real-time fraud pattern detection",
      "Autonomous claims triage and document summarization assistants",
      "Regulatory reporting agents aligned to Basel III and AML compliance",
      "Actuarial risk scoring models tied to explainable P&L impact",
    ],
    constraint:
      "Model risk management (SR 11-7) sign-off, strict explainability requirements, and zero data leakage across tenancies.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Supply Chain",
    icon: Factory,
    cases: [
      "Demand and spare parts multi-echelon forecasting",
      "Visual defect detection on high-speed industrial assembly lines",
      "Predictive maintenance and operating copilots for OT technicians",
      "Supply chain bottleneck mitigation and dynamic rerouting agents",
    ],
    constraint:
      "OT/IT air-gapped separation, intermittent shop-floor connectivity, and low-latency edge inference constraints.",
  },
  {
    id: "public",
    name: "Public Sector & Utilities",
    icon: Building2,
    cases: [
      "Citizen service multilingual assistance and portal automation",
      "Predictive asset condition monitoring across utility distribution grids",
      "Casework triage, statutory compliance validation, and workflow automation",
      "Municipal infrastructure anomaly detection via satellite and IoT sensors",
    ],
    constraint:
      "Procurement transparency, strict accessibility mandates (WCAG), and complete auditability of automated decisions.",
  },
];

function Industries() {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">
            Industry Verticals · Clinical Projects · Published Patents
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-foreground md:text-5xl">
            The constraint, not the algorithm, decides what ships.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Every sector has a gate that kills AI projects late. We design for that gate from week
            one — backed by published patents, clinical research investigations, and peer-reviewed
            architectures.
          </p>
        </div>
      </section>

      {/* Main Tabbed Content Section */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Tabs defaultValue="healthcare" className="w-full">
          <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
            <TabsList className="inline-flex h-auto flex-wrap gap-2 bg-transparent p-0">
              <TabsTrigger
                value="healthcare"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <HeartPulse className="size-4" />
                Healthcare &amp; Life Sciences
              </TabsTrigger>
              <TabsTrigger
                value="banking"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Landmark className="size-4" />
                Banking &amp; Insurance
              </TabsTrigger>
              <TabsTrigger
                value="manufacturing"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Factory className="size-4" />
                Manufacturing &amp; Supply Chain
              </TabsTrigger>
              <TabsTrigger
                value="public"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Building2 className="size-4" />
                Public Sector &amp; Utilities
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Layers className="size-4" />
                All Sectors View
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: Healthcare & Life Sciences */}
          <TabsContent value="healthcare" className="mt-8 space-y-12">
            {/* Sector Overview Card */}
            <article className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <HeartPulse className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-card-foreground">
                      Healthcare &amp; Life Sciences
                    </h2>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                      Clinical AI · Interventional Cardiology · Precision Psychiatry
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                    3 Research Projects
                  </span>
                  <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground border border-accent/30">
                    3 Published Patents
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                    Clinical AI Capabilities &amp; Use Cases
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {industriesList[0]!.cases.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-secondary/50 p-5 border border-border/80">
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-foreground">
                    The Gate / Compliance Mandate
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {industriesList[0]!.constraint}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary" />
                    <span>NMC, HIPAA, and CDSCO regulatory frameworks compliance embedded.</span>
                  </div>
                </div>
              </div>
            </article>

            {/* SECTION 1: CLINICAL AI PROJECTS & RESEARCH INITIATIVES */}
            <div className="rounded-xl border border-border bg-card p-6 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <FolderKanban className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      Clinical AI Projects &amp; Research Initiatives
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Translational investigations, multi-agent frameworks, and high-acuity
                      clinical systems developed by the faculty team.
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground">
                  <Sparkles className="size-3.5 text-primary" />
                  3 Active Research Platforms
                </div>
              </div>

              {/* Projects Grid */}
              <div className="mt-8 space-y-10">
                {clinicalProjects.map((project) => {
                  const IconComp = project.icon;
                  return (
                    <article
                      key={project.id}
                      className="rounded-xl border border-border/80 bg-background/50 p-6 sm:p-8 transition-all hover:border-primary/50 shadow-sm"
                    >
                      {/* Project Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-xs font-bold text-primary-foreground tracking-wide">
                            <IconComp className="size-3.5" />
                            {project.number}
                          </span>
                          <span className="rounded-md border border-border bg-secondary/80 px-2.5 py-1 text-xs font-semibold text-foreground">
                            {project.badge}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-md border border-border/60">
                          <Award className="size-3.5 text-primary" />
                          Linked Patent:{" "}
                          <span className="font-semibold text-foreground">
                            {project.linkedPatent}
                          </span>
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="mt-4">
                        <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                          {project.title}
                        </h3>
                        <p className="text-sm font-medium text-primary mt-1">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Faculty Leads Callout */}
                      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Faculty Leadership:</span>
                        <span>{project.leadFaculty}</span>
                      </div>

                      {/* Public Health Context Box */}
                      <div className="mt-5 rounded-lg bg-secondary/40 p-4 border border-border/60 text-xs sm:text-sm leading-relaxed text-foreground/90">
                        <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <AlertCircle className="size-4 text-primary" />
                          Clinical &amp; Public Health Context
                        </p>
                        <p className="text-muted-foreground">{project.publicHealthContext}</p>
                      </div>

                      {/* Diagnostic Limitations & Status Quo Flaws */}
                      <div className="mt-6">
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-foreground">
                          {project.diagnosticLimitationsTitle}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {project.diagnosticLimitationsText}
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {project.categoricalFlaws.map((flaw, fIdx) => (
                            <div
                              key={fIdx}
                              className="rounded-lg border border-border/70 bg-card p-3.5 shadow-2xs"
                            >
                              <p className="text-xs font-bold text-foreground flex items-center gap-2">
                                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                  {fIdx + 1}
                                </span>
                                {flaw.title}
                              </p>
                              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                                {flaw.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Observational Investigation & Platform Scope */}
                      <div className="mt-6 rounded-lg bg-primary/5 p-4 border border-primary/20">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-primary flex items-center gap-1.5">
                          <Sparkles className="size-4 text-primary" />
                          AI Investigation Scope &amp; Technical Objective
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                          {project.investigationScope}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border/80 bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: PATENTS PUBLISHED */}
            <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-b from-card via-card to-secondary/30 p-6 sm:p-10 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <Award className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      Patents Published
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Proprietary intellectual property and AI inventions officially published by
                      the Intellectual Property Office, Government of India.
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="size-3.5" />
                  3 Published Patent Applications
                </div>
              </div>

              {/* Patent Cards Grid */}
              <div className="mt-8 space-y-8">
                {publishedPatents.map((patent) => (
                  <div
                    key={patent.id}
                    className="rounded-lg border border-border bg-card p-6 sm:p-8 transition-all hover:border-primary/50 shadow-sm"
                  >
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                          <FileText className="size-3.5" />
                          Publication No: {patent.publicationNo}
                        </span>
                        <span className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
                          Application: {patent.applicationNo}
                        </span>
                        <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                          Journal No: {patent.journalNo}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        <Calendar className="size-3.5" />
                        Published: {patent.publicationDate}
                      </span>
                    </div>

                    {/* Patent Title */}
                    <h3 className="mt-4 text-xl font-bold leading-snug text-foreground sm:text-2xl">
                      {patent.title}
                    </h3>

                    {/* Metadata Sub-grid */}
                    <div className="mt-5 grid gap-4 rounded-lg bg-secondary/40 p-4 text-xs sm:grid-cols-2 lg:grid-cols-4 border border-border/60">
                      <div>
                        <span className="text-muted-foreground font-medium block">
                          Inventors
                        </span>
                        <span className="font-semibold text-foreground mt-0.5 block">
                          {patent.inventors.map((inv) => inv.name).join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium block">
                          Applicant(s)
                        </span>
                        <span className="font-semibold text-foreground mt-0.5 block">
                          {patent.applicants.join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium block">
                          Filing Date
                        </span>
                        <span className="font-semibold text-foreground mt-0.5 block">
                          {patent.filingDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium block">
                          Classification (IPC)
                        </span>
                        <span className="font-semibold text-foreground mt-0.5 block font-mono">
                          {patent.classification}
                        </span>
                      </div>
                    </div>

                    {/* Abstract / Summary */}
                    <div className="mt-5">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                        Abstract &amp; Architecture Overview
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {patent.summary}
                      </p>
                    </div>

                    {/* Key Technical Capabilities */}
                    <div className="mt-5">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                        Key Inventions &amp; Claims Scope
                      </h4>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-1 md:grid-cols-2">
                        {patent.keyCapabilities.map((cap, cIdx) => (
                          <li
                            key={cIdx}
                            className="flex items-start gap-2 text-xs leading-relaxed text-foreground/85"
                          >
                            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-4">
                      {patent.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border/80 bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Banking & Insurance */}
          <TabsContent value="banking" className="mt-8">
            <article className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Landmark className="size-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">
                    Banking &amp; Insurance
                  </h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                    Model Risk Governance · Fraud Analytics · Automated Decisioning
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                    Typical Use Cases
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {industriesList[1]!.cases.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-secondary/50 p-5 border border-border/80">
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-foreground">
                    The Gate / Risk Hurdle
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {industriesList[1]!.constraint}
                  </p>
                </div>
              </div>
            </article>
          </TabsContent>

          {/* TAB 3: Manufacturing & Supply Chain */}
          <TabsContent value="manufacturing" className="mt-8">
            <article className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Factory className="size-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">
                    Manufacturing &amp; Supply Chain
                  </h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                    OT/IT Convergence · Edge Computer Vision · Predictive Maintenance
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                    Typical Use Cases
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {industriesList[2]!.cases.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-secondary/50 p-5 border border-border/80">
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-foreground">
                    The Gate / Environmental Constraint
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {industriesList[2]!.constraint}
                  </p>
                </div>
              </div>
            </article>
          </TabsContent>

          {/* TAB 4: Public Sector & Utilities */}
          <TabsContent value="public" className="mt-8">
            <article className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="size-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">
                    Public Sector &amp; Utilities
                  </h2>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                    Citizen Services · Transparent AI · Grid Infrastructure Monitoring
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                    Typical Use Cases
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {industriesList[3]!.cases.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-secondary/50 p-5 border border-border/80">
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-foreground">
                    The Gate / Public Accountability
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {industriesList[3]!.constraint}
                  </p>
                </div>
              </div>
            </article>
          </TabsContent>

          {/* TAB 5: All Sectors View (Grid View) */}
          <TabsContent value="all" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2">
              {industriesList.map((i) => {
                const IconComponent = i.icon;
                return (
                  <article
                    key={i.id}
                    className="rounded-lg border border-border bg-card p-7 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <IconComponent className="size-5" />
                      </div>
                      <h2 className="text-xl font-semibold text-card-foreground">{i.name}</h2>
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] font-semibold text-muted-foreground">
                      Typical use cases
                    </p>
                    <ul className="mt-3 space-y-2">
                      {i.cases.map((c) => (
                        <li key={c} className="flex gap-2.5 text-sm text-muted-foreground">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">The gate: </span>
                      {i.constraint}
                    </p>
                    {i.id === "healthcare" && (
                      <div className="mt-4 rounded-md bg-primary/10 p-3 text-xs text-primary font-medium flex items-center justify-between">
                        <span>Includes 3 Clinical Projects &amp; 3 Published Patents</span>
                        <span className="underline">View Healthcare Tab →</span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Scoping Call CTA Banner */}
        <div className="mt-14 flex flex-col gap-4 rounded-xl border border-border bg-secondary/50 p-8 md:flex-row md:items-center md:justify-between shadow-sm">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Have a proprietary clinical algorithm or regulated use case?
            </h3>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              We start from your domain constraints and patentable technical moats, translating
              research into production systems your compliance team will sign off.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Book a scoping call
          </Link>
        </div>
      </section>
    </>
  );
}
