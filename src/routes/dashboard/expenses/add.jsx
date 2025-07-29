import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ExpenseForm } from "@/components/dashboard/expense-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/dashboard/expenses/add")({
  component: AddExpensePageWithLayout,
});

function AddExpensePage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    console.log("Expense data:", data);
    // TODO: Implement API call to save the expense
    // await pb.collection('expenses').create(data);

    // Show success message
    // toast.success("Expense added successfully!");

    // Redirect to expenses list
    navigate({ to: "/dashboard/expenses" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/dashboard/expenses" })}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add New Expense</h2>
          <p className="text-sm text-muted-foreground">
            Record a new expense to track your spending
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

// Add layout wrapper
export default function AddExpensePageWithLayout() {
  return (
    <DashboardLayout>
      <AddExpensePage />
    </DashboardLayout>
  );
}
