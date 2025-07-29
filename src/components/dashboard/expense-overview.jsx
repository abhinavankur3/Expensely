import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  TrendingUp,
  TrendingDown,
  IndianRupee,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ExpenseOverview() {
  // Mock data - replace with actual data from your API
  const summary = {
    totalExpenses: 2450.75,
    fixedExpenses: 1200.0,
    variableExpenses: 1250.75,
    budget: 3000.0,
    remaining: 549.25,
  };

  const recentTransactions = [
    {
      id: 1,
      description: "Rent",
      amount: 1000.0,
      type: "fixed",
      date: "2025-07-01",
    },
    {
      id: 2,
      description: "Groceries",
      amount: 250.75,
      type: "variable",
      date: "2025-07-15",
    },
    {
      id: 3,
      description: "Internet",
      amount: 60.0,
      type: "fixed",
      date: "2025-07-05",
    },
    {
      id: 4,
      description: "Dining Out",
      amount: 85.5,
      type: "variable",
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
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <Button asChild>
          <Link to="/dashboard/expenses/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              of {formatCurrency(summary.budget)} monthly budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fixed Expenses
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.fixedExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              {((summary.fixedExpenses / summary.totalExpenses) * 100).toFixed(
                1
              )}
              % of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Variable Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.variableExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (summary.variableExpenses / summary.totalExpenses) *
                100
              ).toFixed(1)}
              % of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.remaining)}
            </div>
            <p className="text-xs text-muted-foreground">
              {((summary.remaining / summary.budget) * 100).toFixed(1)}% of
              budget left
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full p-2 bg-blue-100">
                      {transaction.type === "fixed" ? (
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.type === "fixed" ? "Fixed" : "Variable"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="mt-4 w-full" asChild>
              <Link to="/dashboard/expenses">View all transactions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
