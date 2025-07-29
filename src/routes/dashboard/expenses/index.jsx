import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/dashboard/expenses/")({
  component: ExpensesPageWithLayout,
});

function ExpensesPage() {
  // Mock data - replace with actual data from your API
  const expenses = [
    {
      id: 1,
      description: "Rent",
      amount: 1000.0,
      type: "fixed",
      category: "Housing",
      date: "2025-07-01",
    },
    {
      id: 2,
      description: "Groceries",
      amount: 250.75,
      type: "variable",
      category: "Food",
      date: "2025-07-15",
    },
    {
      id: 3,
      description: "Internet",
      amount: 60.0,
      type: "fixed",
      category: "Utilities",
      date: "2025-07-05",
    },
    {
      id: 4,
      description: "Dining Out",
      amount: 85.5,
      type: "variable",
      category: "Food",
      date: "2025-07-20",
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">All Expenses</h2>
        <Button asChild>
          <Link to="/dashboard/expenses/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow
                  key={expense.id}
                  className="hover:bg-black hover:text-white"
                >
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{formatCurrency(expense.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// Add layout wrapper
export default function ExpensesPageWithLayout() {
  return (
    <DashboardLayout>
      <ExpensesPage />
    </DashboardLayout>
  );
}
