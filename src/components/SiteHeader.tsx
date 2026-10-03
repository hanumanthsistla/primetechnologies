import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, UserCheck } from "lucide-react";

const nav = [
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Admin" },
  { to: "/useradmin", label: "UserAdmin" },
  { to: "/login", label: "Login" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("primetech_active_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u?.username) setActiveUser(u.username);
      }
    } catch (_) {}
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight text-foreground">AI Pathways</span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            Applied AI
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground font-medium" }}
            >
              {item.to === "/login" && activeUser ? (
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <span className="size-2 rounded-full bg-emerald-500 inline-block" />
                  {activeUser}
                </span>
              ) : (
                item.label
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book a scoping call
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="rounded-md p-2 text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background px-5 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground"
              activeProps={{ className: "block py-2 text-sm text-foreground font-medium" }}
            >
              {item.to === "/login" && activeUser ? (
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <span className="size-2 rounded-full bg-emerald-500 inline-block" />
                  {activeUser} (Active)
                </span>
              ) : (
                item.label
              )}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
