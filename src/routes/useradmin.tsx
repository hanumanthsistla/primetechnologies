import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "./admin";

export const Route = createFileRoute("/useradmin")({
  head: () => ({
    meta: [
      { title: "UserAdmin Portal — Registered Users & Behavioral Analytics | AI Pathways" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/useradmin" }],
  }),
  component: UserAdminRoutePage,
});

function UserAdminRoutePage() {
  return <AdminPage defaultTab="useradmin" />;
}
