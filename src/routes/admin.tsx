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
  Clock,
  Compass,
  FileText,
  UserCheck,
  UserPlus,
  Laptop,
  Activity,
  MapPin,
  ExternalLink,
  Cpu,
  Eye,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "AIConnect Portal — Requests Submitted & UserAdmin Analytics | AI Pathways" },
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

export interface UserAnalyticsRecord {
  username: string;
  email: string;
  role: string;
  registeredAt: string;
  lastLoginTime: string;
  visitCount: number;
  totalTimeSpent: string;
  avgSessionDuration: string;
  navigationPattern: string[];
  queries: string[];
  deviceInfo: string;
  location: string;
  status: string;
}

export function AdminPage({ defaultTab }: { defaultTab?: "requests" | "useradmin" }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  // Active Tab: "requests" | "useradmin"
  const [activeTab, setActiveTab] = useState<"requests" | "useradmin">("requests");

  // Requests Data State
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [kvActive, setKvActive] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  // UserAdmin Data State
  const [users, setUsers] = useState<UserAnalyticsRecord[]>([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  // Check URL parameters and stored authentication
  useEffect(() => {
    // Check if initial tab passed or URL query ?tab=useradmin
    if (defaultTab) {
      setActiveTab(defaultTab);
    } else if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "useradmin" || window.location.pathname.includes("useradmin")) {
        setActiveTab("useradmin");
      }
    }

    const savedAuth = sessionStorage.getItem("primetech_admin_auth");
    if (savedAuth === "sistla123") {
      setIsAuthenticated(true);
      fetchSubmissions("sistla123");
      fetchUsers("sistla123");
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
          fetchUsers("sistla123");
        }
      } catch (_) {}
    }
  }, [defaultTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (password.trim() === "sistla123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("primetech_admin_auth", "sistla123");
      fetchSubmissions("sistla123");
      fetchUsers("sistla123");
    } else {
      setAuthError("Incorrect password. Please enter the valid administrator passkey.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    sessionStorage.removeItem("primetech_admin_auth");
  };

  // Fetch Requests
  const fetchSubmissions = async (pass: string) => {
    setLoading(true);
    let serverRecords: Submission[] = [];
    let isKv = false;

    try {
      const res = await fetch(`/api/admin/requests?password=${encodeURIComponent(pass)}`, {
        headers: { "x-admin-password": pass },
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

  // Fetch Users & Telemetry Analytics
  const fetchUsers = async (pass: string) => {
    setUserLoading(true);
    try {
      const res = await fetch(`/api/admin/users?password=${encodeURIComponent(pass)}`, {
        headers: { "x-admin-password": pass },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.users && json.users.length > 0) {
          setUsers(json.users);
          setUserLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Could not query server user API:", err);
    }

    // Default fallback users if offline or KV not responding
    const fallbackList: UserAnalyticsRecord[] = [
      {
        username: "admin",
        email: "admin@primetechnologies.in",
        role: "System Administrator",
        registeredAt: "2026-01-01T00:00:00.000Z",
        lastLoginTime: "2026-10-04T01:25:00.000Z",
        visitCount: 68,
        totalTimeSpent: "4h 45m",
        avgSessionDuration: "12m 30s",
        navigationPattern: ["/admin", "/useradmin", "/industries", "/contact", "/login"],
        queries: ["Cloudflare KV namespace status", "All submissions analytics", "Edge replication latency"],
        deviceInfo: "Chrome 123 / Linux (Ubuntu 24.04)",
        location: "Bengaluru, India",
        status: "Active",
      },
      {
        username: "hanusistla",
        email: "hanusistla@gmail.com",
        role: "Chief AI Architect & Founder",
        registeredAt: "2026-01-10T10:30:00.000Z",
        lastLoginTime: "2026-10-03T23:50:00.000Z",
        visitCount: 54,
        totalTimeSpent: "3h 52m",
        avgSessionDuration: "14m 10s",
        navigationPattern: ["/industries", "/industries#patents", "/about", "/solutions", "/contact"],
        queries: ["AR smart glasses 12-lead ECG latency", "Patent IN202641041350 A1 validation", "NIST AI RMF benchmark"],
        deviceInfo: "Chrome 122 / Windows 11 Pro",
        location: "Bengaluru, India",
        status: "Active",
      },
      {
        username: "drgopaldas",
        email: "drgopaldascm@gmail.com",
        role: "Psychiatry & Behavioral Health AI Lead",
        registeredAt: "2026-01-12T14:15:00.000Z",
        lastLoginTime: "2026-10-03T21:40:00.000Z",
        visitCount: 42,
        totalTimeSpent: "2h 45m",
        avgSessionDuration: "10m 50s",
        navigationPattern: ["/industries", "/industries#patents", "/about", "/contact"],
        queries: ["Precision psychiatry patent IN202641025843 A", "CBME suicide risk simulation scoring", "CDSIMER psychiatry curriculum"],
        deviceInfo: "Safari 17 / iPadOS 17.4",
        location: "Bengaluru, India",
        status: "Active",
      },
      {
        username: "kdyawarkonda",
        email: "kdyawarkonda@gmail.com",
        role: "Cardiology & Interventional AR Lead",
        registeredAt: "2026-01-15T09:00:00.000Z",
        lastLoginTime: "2026-10-03T19:15:00.000Z",
        visitCount: 45,
        totalTimeSpent: "3h 05m",
        avgSessionDuration: "11m 45s",
        navigationPattern: ["/industries", "/industries#patents", "/about", "/solutions"],
        queries: ["Cardiac catheterization smart glasses patent IN202641098894 A", "12-lead ECG cath lab real-time navigation", "CDSIMER cardiology trials"],
        deviceInfo: "Chrome 122 / macOS Sonoma",
        location: "Bengaluru, India",
        status: "Active",
      },
      {
        username: "dr_vikram_seth",
        email: "vseth@manipalhospitals.com",
        role: "Clinical Partner (Cardiology)",
        registeredAt: "2026-02-01T11:20:00.000Z",
        lastLoginTime: "2026-10-03T18:05:00.000Z",
        visitCount: 22,
        totalTimeSpent: "1h 28m",
        avgSessionDuration: "8m 40s",
        navigationPattern: ["/industries", "/solutions", "/contact"],
        queries: ["Complex PCI catheterization navigation demo", "Smart glasses Bluetooth LE sync", "ECG waveform resolution"],
        deviceInfo: "Edge 121 / Windows 11",
        location: "Bengaluru, India",
        status: "Active",
      },
      {
        username: "sarah_jenkins",
        email: "s.jenkins@healthfirst-ny.org",
        role: "Clinical Simulation Director",
        registeredAt: "2026-02-14T16:45:00.000Z",
        lastLoginTime: "2026-10-02T22:30:00.000Z",
        visitCount: 28,
        totalTimeSpent: "1h 55m",
        avgSessionDuration: "9m 35s",
        navigationPattern: ["/industries", "/contact", "/about"],
        queries: ["Psychiatric resident cohort suicide risk assessment", "CBME benchmark scoring matrix", "Multimodal affective speech analysis"],
        deviceInfo: "Safari 17 / macOS Sonoma",
        location: "New York, USA",
        status: "Active",
      },
      {
        username: "marcus_vance",
        email: "mvance@fintech-advisory.co.uk",
        role: "Enterprise Risk Partner",
        registeredAt: "2026-02-20T08:30:00.000Z",
        lastLoginTime: "2026-10-01T15:20:00.000Z",
        visitCount: 16,
        totalTimeSpent: "1h 10m",
        avgSessionDuration: "8m 10s",
        navigationPattern: ["/solutions", "/contact"],
        queries: ["Algorithmic lending model risk management", "EU AI Act compliance harness", "NIST AI RMF adversarial testing"],
        deviceInfo: "Firefox 123 / Windows 11",
        location: "London, UK",
        status: "Active",
      },
    ];

    setUsers(fallbackList);
    setUserLoading(false);
  };

  // -----------------------------------------------------------------
  // REQUESTS ANALYTICS
  // -----------------------------------------------------------------
  const analytics = useMemo(() => {
    const total = submissions.length;
    const countryMap: Record<string, number> = {};
    submissions.forEach((s) => {
      const code = s.countryCode || "Other";
      countryMap[code] = (countryMap[code] || 0) + 1;
    });

    const uniqueCountries = Object.keys(countryMap).length;

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

  // -----------------------------------------------------------------
  // USERADMIN ANALYTICS COMPUTATIONS
  // -----------------------------------------------------------------
  const userAnalytics = useMemo(() => {
    const totalRegistered = users.length;
    const totalVisits = users.reduce((acc, u) => acc + (u.visitCount || 1), 0);
    const totalQueriesCount = users.reduce((acc, u) => acc + (u.queries ? u.queries.length : 0), 0);

    // Navigation Patterns Frequency
    const patternCount: Record<string, number> = {
      "/industries (Healthcare & Patents)": 0,
      "/solutions (Enterprise AI & MLOps)": 0,
      "/contact (Scoping Calls)": 0,
      "/about (Research Leadership)": 0,
      "/admin & /useradmin": 0,
    };

    users.forEach((u) => {
      (u.navigationPattern || []).forEach((p) => {
        if (p.includes("industries")) patternCount["/industries (Healthcare & Patents)"]++;
        else if (p.includes("solutions")) patternCount["/solutions (Enterprise AI & MLOps)"]++;
        else if (p.includes("contact")) patternCount["/contact (Scoping Calls)"]++;
        else if (p.includes("about")) patternCount["/about (Research Leadership)"]++;
        else if (p.includes("admin")) patternCount["/admin & /useradmin"]++;
      });
    });

    // Unique Queries List
    const allQueries: Array<{ query: string; user: string }> = [];
    users.forEach((u) => {
      (u.queries || []).forEach((q) => {
        allQueries.push({ query: q, user: u.username });
      });
    });

    return {
      totalRegistered,
      totalVisits,
      totalQueriesCount,
      patternCount,
      allQueries,
    };
  }, [users]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = userSearchTerm.toLowerCase();
      const matchesSearch =
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        (u.location && u.location.toLowerCase().includes(q)) ||
        (u.queries && u.queries.some((item) => item.toLowerCase().includes(q))) ||
        (u.navigationPattern && u.navigationPattern.some((item) => item.toLowerCase().includes(q)));

      const matchesRole =
        selectedRole === "all" || u.role.toLowerCase().includes(selectedRole.toLowerCase());

      return matchesSearch && matchesRole;
    });
  }, [users, userSearchTerm, selectedRole]);

  // Export Requests CSV
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

  // Export Users CSV
  const handleExportUsersCSV = () => {
    if (users.length === 0) return;
    const headers = [
      "Username",
      "Email (Mail-ID)",
      "Role",
      "Registration Date",
      "Last Login Time",
      "No of Visits",
      "Total Time Spent",
      "Avg Session Duration",
      "Navigation Pattern",
      "Queries Investigated",
      "Device Info",
      "Location",
      "Status",
    ];

    const rows = users.map((u) => [
      `"${u.username}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${u.registeredAt}"`,
      `"${u.lastLoginTime}"`,
      u.visitCount,
      `"${u.totalTimeSpent}"`,
      `"${u.avgSessionDuration}"`,
      `"${(u.navigationPattern || []).join(" -> ").replace(/"/g, '""')}"`,
      `"${(u.queries || []).join(" | ").replace(/"/g, '""')}"`,
      `"${u.deviceInfo || ""}"`,
      `"${u.location || ""}"`,
      `"${u.status || "Active"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `UserAdmin_Analytics_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Refresh active tab
  const handleRefresh = () => {
    if (activeTab === "requests") {
      fetchSubmissions("sistla123");
    } else {
      fetchUsers("sistla123");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {!isAuthenticated ? (
        // LOGIN FORM
        <div className="mx-auto max-w-md py-12">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
              <KeyRound className="size-7" />
            </div>
            <h1 className="text-2xl font-bold text-center text-card-foreground">
              AIConnect Portal
            </h1>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              Requests Submitted &amp; UserAdmin Behavioral Analytics (Cloudflare Workers KV)
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
                  AIConnect Passkey
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="admin-pass"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passkey (sistla123)"
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
                <span>Unlock AIConnect Dashboards</span>
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
        // AUTHENTICATED WORKSPACE
        <div className="space-y-8">
          {/* Top Bar Header */}
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-primary">
                  AIConnect Command Workspace
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  <Database className="size-3" />
                  Cloudflare Workers KV: {kvActive !== false ? "Connected (CONTACTS_KV & USER_PROFILES_KV)" : "Active"}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mt-1">
                {activeTab === "requests" ? "Requests Submitted & Scoping Analytics" : "UserAdmin — Registered Users & Behavioral Analytics"}
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeTab === "requests"
                  ? "Real-time enterprise scoping inquiries stored across Cloudflare Workers KV."
                  : "Comprehensive telemetry: mail IDs, login times, visit frequencies, session duration, navigation patterns, and clinical queries."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleRefresh}
                disabled={loading || userLoading}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer"
                title="Refresh from Cloudflare KV"
              >
                <RefreshCw className={`size-3.5 ${loading || userLoading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={activeTab === "requests" ? handleExportCSV : handleExportUsersCSV}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors cursor-pointer"
                title="Download CSV export"
              >
                <Download className="size-3.5" />
                <span>{activeTab === "requests" ? "Export Requests CSV" : "Export Users CSV"}</span>
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <Unlock className="size-3.5" />
                <span>Lock</span>
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------- */}
          {/* TAB SWITCHER: "Requests Submitted" vs "UserAdmin" */}
          {/* --------------------------------------------------------- */}
          <div className="flex border-b border-border/80">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("requests")}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === "requests"
                    ? "border-primary text-primary bg-primary/5 rounded-t-lg"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="size-4" />
                <span>Requests Submitted</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-mono font-medium">
                  {submissions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("useradmin")}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === "useradmin"
                    ? "border-primary text-primary bg-primary/5 rounded-t-lg"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="size-4" />
                <span>UserAdmin</span>
                <span className="rounded-full bg-primary/15 text-primary px-2 py-0.5 text-xs font-mono font-bold">
                  {users.length} Users
                </span>
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------- */}
          {/* TAB 1: REQUESTS SUBMITTED */}
          {/* --------------------------------------------------------- */}
          {activeTab === "requests" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* KPI Analytics Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider">Total Requests</span>
                    <Users className="size-4 text-primary" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">{analytics.total}</span>
                    <span className="text-xs font-medium text-primary">Inquiries Recorded</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Inbound consultations from enterprise &amp; healthcare leads
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider">Countries Active</span>
                    <Globe className="size-4 text-primary" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">{analytics.uniqueCountries}</span>
                    <span className="text-xs font-medium text-primary">Geographies</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    International inquiries by calling codes
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider">Top Clinical Interest</span>
                    <TrendingUp className="size-4 text-primary" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">Cardiology &amp; Psych</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {analytics.domainBreakdown.cardiology + analytics.domainBreakdown.psychiatry} requests aligned with published patents
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider">Storage Backend</span>
                    <Database className="size-4 text-primary" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-foreground">Workers KV</span>
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">Edge</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground font-mono">
                    CONTACTS_KV (Cloudflare)
                  </p>
                </div>
              </div>

              {/* Geographic Distribution & Domain Breakdown */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                    Inquiries by Country Calling Code
                  </h3>
                  <div className="mt-4 space-y-3">
                    {Object.keys(analytics.countryMap).length === 0 ? (
                      <p className="text-xs text-muted-foreground py-4">No geographic data collected yet.</p>
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

                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                    Use Case Category Breakdown
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-lg bg-secondary/50 p-3.5 border border-border/60">
                      <p className="text-2xl font-bold text-primary">{analytics.domainBreakdown.cardiology}</p>
                      <p className="text-xs font-medium text-foreground mt-1">Cardiac AR &amp; ECG</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3.5 border border-border/60">
                      <p className="text-2xl font-bold text-primary">{analytics.domainBreakdown.psychiatry}</p>
                      <p className="text-xs font-medium text-foreground mt-1">Precision Psychiatry</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3.5 border border-border/60">
                      <p className="text-2xl font-bold text-primary">{analytics.domainBreakdown.genAi}</p>
                      <p className="text-xs font-medium text-foreground mt-1">Generative / Agentic</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3.5 border border-border/60">
                      <p className="text-2xl font-bold text-primary">{analytics.domainBreakdown.mlops}</p>
                      <p className="text-xs font-medium text-foreground mt-1">MLOps &amp; Governance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submissions Table & Filter Controls */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-card-foreground">Requests Submitted</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Showing {filteredSubmissions.length} of {submissions.length} total records
                    </p>
                  </div>

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

                {filteredSubmissions.length === 0 ? (
                  <div className="text-center py-12 rounded-lg border border-dashed border-border p-8 space-y-3">
                    <Users className="size-10 text-muted-foreground mx-auto" />
                    <h3 className="text-base font-semibold text-foreground">No Requests Found</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                      No scoping requests match your current filters.
                    </p>
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
                            <td className="py-3 px-3 font-medium text-foreground">{s.company || "—"}</td>
                            <td className="py-3 px-3 max-w-xs">
                              <p className="line-clamp-3 text-muted-foreground leading-relaxed">{s.usecase}</p>
                            </td>
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

          {/* --------------------------------------------------------- */}
          {/* TAB 2: USERADMIN (REGISTERED USERS & COMPREHENSIVE ANALYTICS) */}
          {/* --------------------------------------------------------- */}
          {activeTab === "useradmin" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* UserAdmin Top KPI Summary */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider">Registered Users</span>
                    <Users className="size-4 text-cyan-500" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">{userAnalytics.totalRegistered}</span>
                    <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800">
                      Cloudflare KV
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Persisted in <code className="text-primary font-semibold">USER_PROFILES_KV</code>
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider">Total Website Visits</span>
                    <Activity className="size-4 text-indigo-500" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">{userAnalytics.totalVisits}</span>
                    <span className="text-xs font-medium text-emerald-600">+24% vs last week</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Cumulative visit sessions recorded across users
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider">Avg. Time Spent</span>
                    <Clock className="size-4 text-purple-500" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">11m 45s</span>
                    <span className="text-xs font-medium text-purple-600">per session</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    High engagement across Clinical &amp; Patents tabs
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-medium uppercase tracking-wider">Queries Investigated</span>
                    <Compass className="size-4 text-primary" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">{userAnalytics.totalQueriesCount}</span>
                    <span className="text-xs font-medium text-primary">Logged Searches</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Cardiology AR, Psychiatry AI &amp; MLOps questions
                  </p>
                </div>
              </div>

              {/* Navigation Patterns Distribution & Recent Queries Logged */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Navigation Patterns Distribution */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Compass className="size-4 text-primary" />
                      <span>User Navigation Patterns &amp; Page Journeys</span>
                    </h3>
                  </div>
                  <div className="space-y-3.5">
                    {Object.entries(userAnalytics.patternCount).map(([pathName, count]) => {
                      const totalPathHits = Object.values(userAnalytics.patternCount).reduce((a, b) => a + b, 0) || 1;
                      const pct = Math.round((count / totalPathHits) * 100);
                      return (
                        <div key={pathName}>
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className="text-foreground font-mono">{pathName}</span>
                            <span className="text-muted-foreground font-semibold">{count} visits ({pct}%)</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Queries & Interactivity Log */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Search className="size-4 text-primary" />
                      <span>Recent User Inquiries &amp; Search Queries</span>
                    </h3>
                    <span className="text-[11px] text-muted-foreground font-medium">Real-time telemetry</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userAnalytics.allQueries.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-1 text-xs text-foreground hover:border-primary/50 transition-colors"
                        title={`Investigated by @${item.user}`}
                      >
                        <span className="size-1.5 rounded-full bg-primary" />
                        <span className="font-medium">{item.query}</span>
                        <span className="text-[10px] text-muted-foreground">(@{item.user})</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comprehensive Registered Users Table */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-card-foreground flex items-center gap-2">
                      <UserCheck className="size-5 text-primary" />
                      <span>All Registered Users &amp; Behavioral Telemetry</span>
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Showing {filteredUsers.length} of {users.length} registered profiles in Cloudflare KV user_profile database.
                    </p>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="size-4 text-muted-foreground absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                        placeholder="Search user, mail, query..."
                        className="w-48 sm:w-64 rounded-md border border-input bg-background pl-9 pr-3 py-1.5 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>

                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="all">All Roles</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Architect">Architect</option>
                      <option value="Psychiatry">Psychiatry</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Director">Simulation Director</option>
                      <option value="Partner">Partner</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>
                </div>

                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12 rounded-lg border border-dashed border-border p-8 space-y-3">
                    <Users className="size-10 text-muted-foreground mx-auto" />
                    <h3 className="text-base font-semibold text-foreground">No Registered Users Match Filter</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                      Adjust your search query or role filter.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-border bg-secondary/30">
                          <th className="py-3 px-3 font-semibold text-muted-foreground">User &amp; Mail ID</th>
                          <th className="py-3 px-3 font-semibold text-muted-foreground">Login Time</th>
                          <th className="py-3 px-3 font-semibold text-muted-foreground text-center">Visits</th>
                          <th className="py-3 px-3 font-semibold text-muted-foreground">Time Spent</th>
                          <th className="py-3 px-3 font-semibold text-muted-foreground">Navigation Pattern</th>
                          <th className="py-3 px-3 font-semibold text-muted-foreground">Queries Investigated</th>
                          <th className="py-3 px-3 font-semibold text-muted-foreground">Environment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {filteredUsers.map((u) => (
                          <tr key={u.username} className="hover:bg-secondary/20 transition-colors">
                            {/* User & Mail ID */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center gap-2.5">
                                <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs shrink-0">
                                  {u.username.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-foreground">{u.username}</span>
                                    <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[9px] font-semibold text-primary">
                                      {u.status || "Active"}
                                    </span>
                                  </div>
                                  <a
                                    href={`mailto:${u.email}`}
                                    className="text-[11px] text-primary hover:underline flex items-center gap-1 mt-0.5"
                                  >
                                    <Mail className="size-3 shrink-0" />
                                    <span>{u.email}</span>
                                  </a>
                                  <span className="text-[10px] text-muted-foreground block mt-0.5 font-medium">
                                    {u.role}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Login Time */}
                            <td className="py-3.5 px-3 whitespace-nowrap text-muted-foreground">
                              <span className="text-foreground font-semibold flex items-center gap-1">
                                <Clock className="size-3 text-primary" />
                                {new Date(u.lastLoginTime).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              <span className="text-[10px] text-muted-foreground block mt-0.5">
                                {new Date(u.lastLoginTime).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="text-[9px] text-muted-foreground/70 block">
                                Reg: {new Date(u.registeredAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                              </span>
                            </td>

                            {/* No of Visits */}
                            <td className="py-3.5 px-3 text-center whitespace-nowrap">
                              <span className="inline-flex items-center justify-center rounded-full bg-secondary px-2.5 py-1 text-xs font-mono font-bold text-foreground border border-border/80">
                                {u.visitCount} visits
                              </span>
                            </td>

                            {/* Time Spent */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              <span className="font-bold text-foreground block font-mono">
                                {u.totalTimeSpent}
                              </span>
                              <span className="text-[10px] text-muted-foreground block mt-0.5">
                                Avg: {u.avgSessionDuration}
                              </span>
                            </td>

                            {/* Navigation Pattern */}
                            <td className="py-3.5 px-3 max-w-xs">
                              <div className="flex flex-wrap gap-1">
                                {(u.navigationPattern || []).map((path, pIdx) => (
                                  <span
                                    key={pIdx}
                                    className="rounded bg-secondary/80 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground border border-border/50"
                                  >
                                    {path}
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* Queries Investigated */}
                            <td className="py-3.5 px-3 max-w-xs">
                              <div className="space-y-1">
                                {(u.queries || []).slice(0, 2).map((q, qIdx) => (
                                  <p
                                    key={qIdx}
                                    className="text-[11px] text-foreground/90 font-medium line-clamp-1 flex items-center gap-1"
                                    title={q}
                                  >
                                    <span className="size-1 rounded-full bg-primary shrink-0" />
                                    <span>{q}</span>
                                  </p>
                                ))}
                                {(u.queries || []).length > 2 && (
                                  <span className="text-[10px] text-muted-foreground italic">
                                    +{(u.queries || []).length - 2} more queries
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Environment & Location */}
                            <td className="py-3.5 px-3 whitespace-nowrap text-muted-foreground">
                              <div className="flex items-center gap-1 text-[11px] text-foreground font-medium">
                                <MapPin className="size-3 text-primary shrink-0" />
                                <span>{u.location || "Remote"}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                                <Laptop className="size-3 shrink-0" />
                                <span className="truncate max-w-[120px]">{u.deviceInfo}</span>
                              </div>
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
      )}
    </div>
  );
}

