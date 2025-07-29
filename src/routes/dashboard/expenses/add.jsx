import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ExpenseForm } from "@/components/dashboard/expense-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { createExpense } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
export const Route = createFileRoute("/dashboard/expenses/add")({
  component: AddExpensePageWithLayout,
});

function AddExpensePage() {
  const navigate = useNavigate();
  const { pb } = useAuth();

  const handleSubmit = (data) => {
    const toastId = toast.loading("Adding expense...");

    createExpense(pb, data)
      .then(() => {
        toast.success("Expense added successfully!", { id: toastId });
        navigate({ to: "/dashboard/expenses" });
      })
      .catch((error) => {
        console.error("Error creating expense:", error);
        toast.error("Failed to add expense. Please try again.", {
          id: toastId,
        });
      });
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
