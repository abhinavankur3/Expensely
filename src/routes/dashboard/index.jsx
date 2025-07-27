import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndexRouteComponent,
  beforeLoad: ({ context }) => {
    const { user } = context.auth;
    if (!user) {
      return redirect({ to: "/login" });
    }
  },
});

function DashboardIndexRouteComponent() {
  return <div>Hello "/dashboard/"!</div>;
}
