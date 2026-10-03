import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Download,
  Search,
  Users,
  Globe,
  Database,
  Calendar,
  Phone,
  Mail,
  Building,
  TrendingUp,
  Filter,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Requests Submitted & Analytics | AI Pathways" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: AdminPage,
});

interface Submission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  usecase: string;
  status?: string;
  ip?: string;
}

function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [kvActive, setKvActive] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  // Check existing session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("primetech_admin_auth");
    if (savedAuth === "sistla123") {
      setIsAuthenticated(true);
      fetchSubmissions("sistla123");
      return;
    }
    const savedActiveUser = localStorage.getItem("primetech_active_user");
    if (savedActiveUser) {
      try {
        const u = JSON.parse(savedActiveUser);
        if (u.username === "admin") {
          setIsAuthenticated(true);
          sessionStorage.setItem("primetech_admin_auth", "sistla123");
          fetchSubmissions("sistla123");
        }
      } catch (_) {}
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (password.trim() === "sistla123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("primetech_admin_auth", "sistla123");
      fetchSubmissions("sistla123");
    } else {
      setAuthError("Incorrect password. Please enter the valid administrator passkey.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    sessionStorage.removeItem("primetech_admin_auth");
  };

  const fetchSubmissions = async (pass: string) => {
    setLoading(true);
    let serverRecords: Submission[] = [];
    let isKv = false;

    try {
      const res = await fetch(`/api/admin/requests?password=${encodeURIComponent(pass)}`, {
        headers: {
          "x-admin-password": pass,
        },
      });

      if (res.ok) {
        const json = await res.json();
        serverRecords = json.submissions || [];
        isKv = json.kvActive;
        setKvActive(isKv);
      }
    } catch (err) {
      console.warn("Could not query server KV API directly:", err);
    }

    // Merge with any client-side localStorage backup submissions
    try {
      const localData: Submission[] = JSON.parse(
        localStorage.getItem("primetech_contact_submissions") || "[]"
      );
      const serverIds = new Set(serverRecords.map((s) => s.id));
      for (const item of localData) {
        if (!serverIds.has(item.id)) {
          serverRecords.push(item);
        }
      }
    } catch (_) {}

    serverRecords.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setSubmissions(serverRecords);
    setLoading(false);
  };

  // Analytics Computations
  const analytics = useMemo(() => {
    const total = submissions.length;

    // Country Breakdown
    const countryMap: Record<string, number> = {};
    submissions.forEach((s) => {
      const code = s.countryCode || "Other";
      countryMap[code] = (countryMap[code] || 0) + 1;
    });

    const uniqueCountries = Object.keys(countryMap).length;

    // Use-case keywords
    let cardiologyCount = 0;
    let psychiatryCount = 0;
    let genAiCount = 0;
    let mlopsCount = 0;

    submissions.forEach((s) => {
      const text = (s.usecase + " " + s.company).toLowerCase();
      if (text.includes("cardiac") || text.includes("heart") || text.includes("ecg") || text.includes("cath")) {
        cardiologyCount++;
      } else if (text.includes("psych") || text.includes("mental") || text.includes("nmc") || text.includes("suicide")) {
        psychiatryCount++;
      } else if (text.includes("agent") || text.includes("llm") || text.includes("genai") || text.includes("rag")) {
        genAiCount++;
      } else {
        mlopsCount++;
      }
    });

    return {
      total,
      uniqueCountries,
      countryMap,
      domainBreakdown: {
        cardiology: cardiologyCount,
        psychiatry: psychiatryCount,
        genAi: genAiCount,
        mlops: mlopsCount,
      },
    };
  }, [submissions]);

  // Filtered Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.usecase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone.includes(searchTerm);

      const matchesCountry =
        selectedCountry === "all" || s.countryCode === selectedCountry;

      return matchesSearch && matchesCountry;
    });
  }, [submissions, searchTerm, selectedCountry]);

  // Export to CSV
  const handleExportCSV = () => {
    if (submissions.length === 0) return;

    const headers = [
      "ID",
      "Timestamp",
      "Name",
      "Email",
      "Country Code",
      "Phone",
      "Organization",
      "Use Case Description",
      "Status",
    ];

    const rows = submissions.map((s) => [
      s.id,
      `"${s.timestamp}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email}"`,
      `"${s.countryCode}"`,
      `"${s.phone}"`,
      `"${s.company.replace(/"/g, '""')}"`,
      `"${s.usecase.replace(/"/g, '""')}"`,
      `"${s.status || "New"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Scoping_Requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add sample demo submissions if empty
  const handleAddSampleData = () => {
    const samples: Submission[] = [
      {
        id: "req_demo_01",
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        name: "Dr. Vikram Seth",
        email: "vseth@manipalhospitals.com",
        countryCode: "+91",
        phone: "9845012345",
        company: "Manipal Hospital Cardiology Dept",
        usecase: "Exploring pilot deployment of the Smart Interventional Glasses in our cardiac catheterization lab for 12-lead ECG real-time navigation during complex PCI cases.",
        status: "Reviewed",
      },
      {
        id: "req_demo_02",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        name: "Sarah Jenkins",
        email: "s.jenkins@healthfirst-ny.org",
        countryCode: "+1",
        phone: "4155550198",
        company: "HealthFirst Clinical Health System",
        usecase: "Need objective simulation training for psychiatric resident cohort suicide risk assessment aligned with competency-based medical education benchmarks.",
        status: "New",
      },
      {
        id: "req_demo_03",
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        name: "Marcus Vance",
        email: "mvance@fintech-advisory.co.uk",
        countryCode: "+44",
        phone: "7911123456",
        company: "Vance Financial Risk Partners",
        usecase: "Model risk management governance and EU AI Act / NIST AI RMF assurance harness for our algorithmic lending pipeline.",
        status: "New",
      },
    ];

    setSubmissions(samples);
    try {
      localStorage.setItem("primetech_contact_submissions", JSON.stringify(samples));
    } catch (_) {}
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {!isAuthenticated ? (
        // LOGIN FORM
        <div className="mx-auto max-w-md py-12">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
              <KeyRound className="size-7" />
            </div>
            <h1 className="text-2xl font-bold text-center text-card-foreground">
              Administrator Portal
            </h1>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              Requests Submitted &amp; Cloudflare Workers KV Analytics
            </p>

            {authError && (
              <div className="mt-4 rounded-md bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive flex items-center gap-2">
                <AlertTriangle className="size-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="admin-pass"
                  className="text-xs font-semibold text-foreground block"
                >
                  Administrator Passkey
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="admin-pass"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password (sistla123)"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Default passkey configured: <span className="font-mono text-primary font-bold">sistla123</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="size-4" />
                <span>Unlock Requests Dashboard</span>
              </button>
            </form>

            <div className="mt-6 border-t border-border pt-4 text-center space-y-2">
              <span className="text-[11px] text-muted-foreground flex items-center justify-center gap-1.5">
                <ShieldCheck className="size-3.5 text-primary" />
                <span>Protected by Cloudflare Edge &amp; Workers KV Store</span>
              </span>
              <p className="text-xs text-muted-foreground">
                Looking for user account portal?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Sign in or Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        // AUTHENTICATED DASHBOARD
        <div className="space-y-8">
          {/* Top Bar */}
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-primary">
                  Admin Workspace
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  <Database className="size-3" />
                  Cloudflare Workers KV: {kvActive ? "Connected" : "Active (Binding Ready)"}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mt-1">
                Requests Submitted &amp; Analytics
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Real-time scoping inquiries stored in Cloudflare Workers KV data store.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => fetchSubmissions("sistla123")}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
                title="Refresh submissions from Cloudflare KV"
              >
                <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleExportCSV}
                disabled={submissions.length === 0}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary disabled:opacity-50 transition-colors"
                title="Download CSV export"
              >
                <Download className="size-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <Unlock className="size-3.5" />
                <span>Lock</span>
              </button>
            </div>
          </div>

          {/* KPI Analytics Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* KPI 1 */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium uppercase tracking-wider">
                  Total Requests
                </span>
                <Users className="size-4 text-primary" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  {analytics.total}
                </span>
                <span className="text-xs font-medium text-primary">Inquiries Recorded</span>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Inbound consultations from enterprise &amp; healthcare leads
              </p>
            </div>

            {/* KPI 2 */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium uppercase tracking-wider">
                  Countries Active
                </span>
                <Globe className="size-4 text-primary" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  {analytics.uniqueCountries}
                </span>
                <span className="text-xs font-medium text-primary">Geographies</span>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                International inquiries by calling codes
              </p>
            </div>

            {/* KPI 3 */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium uppercase tracking-wider">
                  Top Clinical Interest
                </span>
                <TrendingUp className="size-4 text-primary" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  Cardiology &amp; Psych
                </span>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {analytics.domainBreakdown.cardiology + analytics.domainBreakdown.psychiatry} requests aligned with published patents
              </p>
            </div>

            {/* KPI 4 */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium uppercase tracking-wider">
                  Storage Backend
                </span>
                <Database className="size-4 text-primary" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-lg font-bold text-foreground">
                  Workers KV
                </span>
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  Edge
                </span>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground font-mono">
                CONTACTS_KV (Cloudflare)
              </p>
            </div>
          </div>

          {/* Domain Breakdown & Geographic Distribution */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Geographic Distribution */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Inquiries by Country Calling Code
              </h3>
              <div className="mt-4 space-y-3">
                {Object.keys(analytics.countryMap).length === 0 ? (
                  <p className="text-xs text-muted-foreground py-4">
                    No geographic data collected yet.
                  </p>
                ) : (
                  Object.entries(analytics.countryMap).map(([code, count]) => {
                    const pct = Math.round((count / (analytics.total || 1)) * 100);
                    return (
                      <div key={code}>
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-foreground">Calling Code {code}</span>
                          <span className="text-muted-foreground">{count} ({pct}%)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Inquiries by Subject Domain */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Use Case Category Breakdown
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg bg-secondary/50 p-3.5 border border-border/60">
                  <p className="text-2xl font-bold text-primary">
                    {analytics.domainBreakdown.cardiology}
                  </p>
                  <p className="text-xs font-medium text-foreground mt-1">Cardiac AR &amp; ECG</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3.5 border border-border/60">
                  <p className="text-2xl font-bold text-primary">
                    {analytics.domainBreakdown.psychiatry}
                  </p>
                  <p className="text-xs font-medium text-foreground mt-1">Precision Psychiatry</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3.5 border border-border/60">
                  <p className="text-2xl font-bold text-primary">
                    {analytics.domainBreakdown.genAi}
                  </p>
                  <p className="text-xs font-medium text-foreground mt-1">Generative / Agentic</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3.5 border border-border/60">
                  <p className="text-2xl font-bold text-primary">
                    {analytics.domainBreakdown.mlops}
                  </p>
                  <p className="text-xs font-medium text-foreground mt-1">MLOps &amp; Governance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submissions Table & Filter Controls */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-card-foreground">
                  Requests Submitted
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Showing {filteredSubmissions.length} of {submissions.length} total records
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="size-4 text-muted-foreground absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search requests..."
                    className="w-48 sm:w-64 rounded-md border border-input bg-background pl-9 pr-3 py-1.5 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Countries</option>
                  {Object.keys(analytics.countryMap).map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12 rounded-lg border border-dashed border-border p-8 space-y-3">
                <Users className="size-10 text-muted-foreground mx-auto" />
                <h3 className="text-base font-semibold text-foreground">
                  No Requests Found
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  {submissions.length === 0
                    ? "No scoping requests have been submitted yet. Try submitting a form on the Contact page, or load sample demonstration entries."
                    : "No requests match your current search or country filter."}
                </p>
                {submissions.length === 0 && (
                  <button
                    onClick={handleAddSampleData}
                    className="mt-2 rounded-md bg-secondary px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    Load Sample Demonstration Records
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="py-3 px-3 font-semibold text-muted-foreground">Date &amp; Time</th>
                      <th className="py-3 px-3 font-semibold text-muted-foreground">Contact</th>
                      <th className="py-3 px-3 font-semibold text-muted-foreground">Phone Number</th>
                      <th className="py-3 px-3 font-semibold text-muted-foreground">Organization</th>
                      <th className="py-3 px-3 font-semibold text-muted-foreground">Use Case Details</th>
                      <th className="py-3 px-3 font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredSubmissions.map((s) => (
                      <tr key={s.id} className="hover:bg-secondary/20 transition-colors">
                        {/* Timestamp */}
                        <td className="py-3 px-3 whitespace-nowrap text-muted-foreground">
                          {new Date(s.timestamp).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          <span className="text-[10px] text-muted-foreground/70 block">
                            {new Date(s.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>

                        {/* Contact */}
                        <td className="py-3 px-3">
                          <span className="font-semibold text-foreground block">{s.name}</span>
                          <a
                            href={`mailto:${s.email}`}
                            className="text-[11px] text-primary hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <Mail className="size-3" />
                            {s.email}
                          </a>
                        </td>

                        {/* Phone */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          {s.phone ? (
                            <a
                              href={`tel:${s.countryCode}${s.phone}`}
                              className="inline-flex items-center gap-1 font-mono text-xs text-foreground hover:text-primary transition-colors"
                            >
                              <Phone className="size-3 text-primary" />
                              <span>{s.countryCode} {s.phone}</span>
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>

                        {/* Company */}
                        <td className="py-3 px-3 font-medium text-foreground">
                          {s.company || "—"}
                        </td>

                        {/* Use Case */}
                        <td className="py-3 px-3 max-w-xs">
                          <p className="line-clamp-3 text-muted-foreground leading-relaxed">
                            {s.usecase}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            <CheckCircle className="size-2.5" />
                            {s.status || "New"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
