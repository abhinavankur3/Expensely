import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndexRouteComponent,
});

function DashboardIndexRouteComponent() {
  const navigate = useNavigate();
  const { pb } = useAuth();

  if (!pb.authStore.isValid) {
    navigate({ to: "/login" });
    return;
  }

  return <div>Hello {pb.authStore.record.email}!</div>;
}
