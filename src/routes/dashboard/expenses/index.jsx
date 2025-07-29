import { useState, useEffect } from "react";
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
import { useAuth } from "@/contexts/auth-context";
import { getExpenses } from "@/lib/api";
import { format } from "date-fns";

export const Route = createFileRoute("/dashboard/expenses/")({
  component: ExpensesPageWithLayout,
});

function ExpensesPage() {
  // Mock data - replace with actual data from your API
  const [expenses, setExpenses] = useState([]);

  const { pb } = useAuth();

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchExpenses = async () => {
      try {
        const expenses = await getExpenses(
          pb,
          {
            signal: abortController.signal,
          },
          false
        );
        if (isMounted) {
          setExpenses(expenses);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching expenses:", error);
        }
      }
    };

    fetchExpenses();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

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
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell>
                    {format(expense.expenseDate, "dd MMM yyyy")}
                  </TableCell>
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
