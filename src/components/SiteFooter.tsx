import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-foreground">AI Pathways</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Applied AI, generative AI and agentic systems delivered into enterprise production
            environments.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/solutions" className="text-muted-foreground hover:text-foreground">
                Solutions
              </Link>
            </li>
            <li>
              <Link to="/industries" className="text-muted-foreground hover:text-foreground">
                Industries
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Start here</p>
          <p className="mt-3 text-sm text-muted-foreground">
            A 45-minute scoping call to pressure-test one use case against data readiness, risk and
            expected payback.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Book a scoping call
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AI Pathways. All rights reserved.
      </div>
    </footer>
  );
}
