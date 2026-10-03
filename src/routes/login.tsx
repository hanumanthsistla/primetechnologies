import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Cpu,
  Layers,
  LogOut,
  Send,
  UserPlus,
  LogIn,
  HelpCircle,
  Database,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "AI Pathways — User Portal & Enterprise Access" },
      {
        name: "description",
        content: "Sign in to AI Pathways enterprise systems, register a new account, or recover credentials.",
      },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
  component: LoginPage,
});

type AuthMode = "signin" | "register" | "forgot";

interface UserSession {
  username: string;
  email: string;
  role: string;
  displayName?: string;
}

function LoginPage() {
  const navigate = useNavigate();

  // Mode: signin | register | forgot
  const [mode, setMode] = useState<AuthMode>("signin");

  // Signin fields
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register fields
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot password fields
  const [forgotEmail, setForgotEmail] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [recoveryInfo, setRecoveryInfo] = useState<{ username?: string; email?: string } | null>(null);

  // Session state
  const [session, setSession] = useState<UserSession | null>(null);

  // Check stored session
  useEffect(() => {
    try {
      const stored = localStorage.getItem("primetech_active_user");
      if (stored) {
        setSession(JSON.parse(stored));
      }
    } catch (_) {}
  }, []);

  // Quick fill default admin credentials
  const fillDefaultAdmin = () => {
    setLoginUsername("admin");
    setLoginPassword("admin");
    setErrorMessage("");
    setSuccessMessage("Pre-filled default administrator credentials (admin / admin).");
  };

  // Switch modes cleanly
  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrorMessage("");
    setSuccessMessage("");
    setRecoveryInfo(null);
  };

  // Sign In handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const userObj: UserSession = data.user || {
          username: loginUsername,
          email: `${loginUsername}@primetechnologies.in`,
          role: loginUsername === "admin" ? "Administrator" : "Member",
        };

        setSession(userObj);
        localStorage.setItem("primetech_active_user", JSON.stringify(userObj));
        if (userObj.username === "admin") {
          sessionStorage.setItem("primetech_admin_auth", "sistla123");
        }
        setSuccessMessage(`Credentials validated! Redirecting to https://primetechnologies.hanusistla.workers.dev/...`);

        // Navigate to url: https://primetechnologies.hanusistla.workers.dev/
        setTimeout(() => {
          window.location.href = "/";
        }, 300);
      } else {
        setErrorMessage(data.error || "Authentication failed. Please verify your credentials.");
      }
    } catch (err: any) {
      // Local development or offline fallback
      if (loginUsername.trim() === "admin" && loginPassword.trim() === "admin") {
        const adminObj: UserSession = {
          username: "admin",
          email: "admin@primetechnologies.in",
          role: "Administrator",
          displayName: "System Administrator",
        };
        setSession(adminObj);
        localStorage.setItem("primetech_active_user", JSON.stringify(adminObj));
        sessionStorage.setItem("primetech_admin_auth", "sistla123");
        setSuccessMessage("Credentials validated! Redirecting to https://primetechnologies.hanusistla.workers.dev/...");
        setTimeout(() => {
          window.location.href = "/";
        }, 300);
      } else {
        setErrorMessage(err.message || "Failed to contact authentication service.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (regPassword !== regConfirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(
          `User account '${regUsername}' has been successfully created and saved into Cloudflare KV user_profile database! You can now sign in.`
        );
        setLoginUsername(regUsername);
        setLoginPassword(regPassword);
        // Reset form
        setRegUsername("");
        setRegEmail("");
        setRegPassword("");
        setRegConfirmPassword("");
        setMode("signin");
      } else {
        setErrorMessage(data.error || "Registration could not be completed.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error while saving user profile.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot credentials handler
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setRecoveryInfo(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(data.message);
        setRecoveryInfo({
          username: data.username,
          email: forgotEmail,
        });
      } else {
        setErrorMessage(data.error || "No matching registered account found with that email address.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error while processing recovery request.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem("primetech_active_user");
    sessionStorage.removeItem("primetech_admin_auth");
    setSuccessMessage("You have been signed out.");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 text-slate-100 flex flex-col justify-center">
      {/* ------------------------------------------------------------- */}
      {/* AESTHETIC PICTURE & NEURAL NETWORK BACKGROUND */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Deep ambient cosmic glow orbs */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-cyan-600/15 blur-[120px]" />
        <div className="absolute top-1/3 -left-32 h-[450px] w-[550px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute -bottom-24 right-0 h-[500px] w-[600px] rounded-full bg-purple-600/15 blur-[130px]" />

        {/* Neural Network / Synaptic AI Pathways SVG Art */}
        <svg
          className="absolute inset-0 h-full w-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <defs>
            <linearGradient id="ai-pathway-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* AI Neural Interconnect Pathways */}
          <path
            d="M -100 200 C 300 150, 450 450, 720 300 C 990 150, 1150 450, 1550 250"
            fill="none"
            stroke="url(#ai-pathway-grad)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <path
            d="M -50 450 C 250 550, 500 250, 720 480 C 940 710, 1200 400, 1500 600"
            fill="none"
            stroke="url(#ai-pathway-grad)"
            strokeWidth="1.8"
          />
          <path
            d="M 100 800 C 400 700, 600 850, 720 600 C 840 350, 1100 650, 1400 750"
            fill="none"
            stroke="url(#ai-pathway-grad)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <path
            d="M 720 0 L 720 900"
            fill="none"
            stroke="url(#ai-pathway-grad)"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />

          {/* Glowing Neural Synapse Nodes */}
          <circle cx="220" cy="220" r="5" fill="#38bdf8" />
          <circle cx="220" cy="220" r="14" fill="url(#node-glow)" opacity="0.6" />

          <circle cx="450" cy="450" r="6" fill="#818cf8" />
          <circle cx="450" cy="450" r="18" fill="url(#node-glow)" opacity="0.6" />

          <circle cx="720" cy="300" r="8" fill="#38bdf8" />
          <circle cx="720" cy="300" r="24" fill="url(#node-glow)" opacity="0.7" />

          <circle cx="720" cy="480" r="7" fill="#a855f7" />
          <circle cx="720" cy="480" r="20" fill="url(#node-glow)" opacity="0.6" />

          <circle cx="990" cy="150" r="5" fill="#38bdf8" />
          <circle cx="990" cy="150" r="15" fill="url(#node-glow)" opacity="0.5" />

          <circle cx="1200" cy="400" r="6" fill="#818cf8" />
          <circle cx="1200" cy="400" r="18" fill="url(#node-glow)" opacity="0.6" />

          <circle cx="350" cy="720" r="5" fill="#38bdf8" />
          <circle cx="1100" cy="650" r="5" fill="#a855f7" />
        </svg>

        {/* Perspective Cyber Grid Floor */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px),
                              linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CENTRAL HERO & BRANDING: "AI Pathways" */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 text-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-medium text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-950/50 mb-3">
          <Sparkles className="size-3.5 text-cyan-400 animate-pulse" />
          <span>Cloudflare Workers KV User Profile Database</span>
        </div>

        {/* Centrally Prominent "AI Pathways" Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md">
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            AI Pathways
          </span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Enterprise Portal for Applied Artificial Intelligence &amp; Clinical Decision Systems
        </p>

        {/* Authenticated banner if already logged in */}
        {session && (
          <div className="mt-6 mx-auto max-w-md rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-left backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  {session.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{session.username}</span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                      {session.role}
                    </span>
                  </div>
                  <span className="text-xs text-slate-300">{session.email}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              >
                <LogOut className="size-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-500/20 flex flex-wrap gap-2 justify-end">
              {session.role === "Administrator" && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-500 transition shadow-sm"
                >
                  <Cpu className="size-3.5" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <Link
                to="/solutions"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
              >
                <span>View Solutions</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* INTERACTIVE AUTHENTICATION CARD */}
        {/* ----------------------------------------------------------- */}
        <div className="mt-6 mx-auto max-w-md text-left">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl ring-1 ring-white/10">
            {/* Mode Navigation Tabs */}
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950/70 p-1 border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => switchMode("signin")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition cursor-pointer ${
                  mode === "signin"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <LogIn className="size-3.5" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition cursor-pointer ${
                  mode === "register"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <UserPlus className="size-3.5" />
                <span>New User</span>
              </button>

              <button
                type="button"
                onClick={() => switchMode("forgot")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition cursor-pointer ${
                  mode === "forgot"
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <HelpCircle className="size-3.5" />
                <span>Forgot?</span>
              </button>
            </div>

            {/* Error Notification Alert */}
            {errorMessage && (
              <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3.5 text-xs text-rose-300 flex items-start gap-2.5 backdrop-blur-sm animate-in fade-in">
                <AlertCircle className="size-4 shrink-0 text-rose-400 mt-0.5" />
                <div className="flex-1 font-medium">{errorMessage}</div>
              </div>
            )}

            {/* Success Notification Alert */}
            {successMessage && (
              <div className="mb-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 text-xs text-emerald-300 flex items-start gap-2.5 backdrop-blur-sm animate-in fade-in">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <div className="flex-1 font-medium">{successMessage}</div>
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* 1. SIGN IN FORM */}
            {/* --------------------------------------------------------- */}
            {mode === "signin" && (
              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Default Credentials Helper Callout */}
                <div className="rounded-lg border border-cyan-500/20 bg-cyan-950/30 p-3 text-xs text-cyan-200 flex items-center justify-between">
                  <div>
                    <span className="font-semibold block text-cyan-300">Default Credentials</span>
                    <span className="text-[11px] text-slate-300">
                      User: <strong className="font-mono text-cyan-400">admin</strong> / Pass:{" "}
                      <strong className="font-mono text-cyan-400">admin</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={fillDefaultAdmin}
                    className="rounded bg-cyan-600/30 border border-cyan-500/40 px-2 py-1 text-[11px] font-semibold text-cyan-200 hover:bg-cyan-600/50 transition cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    User Name
                  </label>
                  <div className="relative">
                    <User className="size-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="Enter username (e.g. admin)"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => switchMode("forgot")}
                      className="text-xs text-cyan-400 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="size-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password (e.g. admin)"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-9 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showLoginPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 text-sm font-semibold text-white hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-950 transition cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Validating &amp; Navigating...</span>
                  ) : (
                    <>
                      <LogIn className="size-4" />
                      <span>Sign In to AI Pathways</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center text-xs text-slate-400">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("register")}
                    className="font-semibold text-cyan-400 hover:underline cursor-pointer"
                  >
                    Create New User Account
                  </button>
                </div>
              </form>
            )}

            {/* --------------------------------------------------------- */}
            {/* 2. NEW USER REGISTRATION FORM */}
            {/* --------------------------------------------------------- */}
            {mode === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <UserPlus className="size-4 text-cyan-400" />
                    <span>Create User Profile</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    User profiles are persisted in Cloudflare KV (<code className="text-cyan-400">USER_PROFILES_KV</code>).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Choose Username
                  </label>
                  <div className="relative">
                    <User className="size-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      minLength={3}
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="e.g. dr_sastry, kiran_d"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    System alerts if this username is already registered.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="size-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. researcher@hospital.org"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Used for notifications and credential recovery.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="size-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showRegPassword ? "text" : "password"}
                      required
                      minLength={4}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Create secure password"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-9 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showRegPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="size-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showRegPassword ? "text" : "password"}
                      required
                      minLength={4}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 text-sm font-semibold text-white hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-950 transition cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Registering Profile...</span>
                  ) : (
                    <>
                      <UserPlus className="size-4" />
                      <span>Register in Cloudflare KV</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center text-xs text-slate-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signin")}
                    className="font-semibold text-cyan-400 hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}

            {/* --------------------------------------------------------- */}
            {/* 3. FORGOT USERNAME & PASSWORD FORM */}
            {/* --------------------------------------------------------- */}
            {mode === "forgot" && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="size-4 text-cyan-400" />
                    <span>Recover Credentials</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Enter your registered email address to receive your username and a password reset link.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="size-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="e.g. admin@primetechnologies.in"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 text-sm font-semibold text-white hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-950 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Dispatching Mail...</span>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>Send Recovery Email to Registered User</span>
                    </>
                  )}
                </button>

                {/* Simulated Recovery Confirmation Box */}
                {recoveryInfo && (
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/40 p-3.5 text-xs text-cyan-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-cyan-300">
                      <Mail className="size-4" />
                      <span>Email Dispatched via Cloudflare Workers</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Recipient: <strong className="text-white">{recoveryInfo.email}</strong>
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Associated Username: <strong className="text-white">{recoveryInfo.username}</strong>
                    </p>
                    <p className="text-[10px] text-cyan-400 pt-1">
                      (A password reset token has been generated and queued for secure SMTP delivery).
                    </p>
                  </div>
                )}

                <div className="pt-2 text-center text-xs text-slate-400">
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("signin")}
                    className="font-semibold text-cyan-400 hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}

            {/* Cloudflare Edge Footer Badge */}
            <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="size-3.5 text-cyan-400" />
              <span>Secured by Cloudflare Workers &amp; KV Storage</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights below auth box */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-sm">
            <Cpu className="size-5 text-cyan-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">AI Neural Pathways</h4>
            <p className="mt-1 text-xs text-slate-400">
              High-throughput multimodal AI pipelines for precision psychiatry &amp; cardiology navigation.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-sm">
            <Database className="size-5 text-indigo-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Cloudflare KV Database</h4>
            <p className="mt-1 text-xs text-slate-400">
              Low-latency edge user profiles and scoped requests storage distributed worldwide.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-sm">
            <KeyRound className="size-5 text-purple-400 mb-2" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Edge Auth &amp; Recovery</h4>
            <p className="mt-1 text-xs text-slate-400">
              Default administrator access, duplicate detection, and automated credentials dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
