import { createFileRoute } from "@tanstack/react-router";
import { ExpenseOverview } from "@/components/dashboard/expense-overview";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

// This route is now a child of the _dashboard layout route
export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <DashboardLayout>
      <ExpenseOverview />
    </DashboardLayout>
  );
}
