import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  AlertCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getRecentExpenses, getExpenses } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";

export function ExpenseOverview() {
  const { pb } = useAuth();
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    fixedExpenses: 0,
    variableExpenses: 0,
    budget: 0,
    remaining: 0,
    income: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchExpenses = async () => {
      try {
        const expenses = await getRecentExpenses(pb, {
          signal: abortController.signal,
        });
        if (isMounted) {
          setRecentTransactions(expenses.items);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching recent expenses:", error);
        }
      }
    };

    const fetchSummary = async () => {
      try {
        const summaryData = await getExpenses(pb, {
          signal: abortController.signal,
        });
        if (isMounted) {
          setSummary(summaryData);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching expense summary:", error);
        }
      }
    };

    fetchExpenses();
    fetchSummary();

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
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <Button asChild>
          <Link to="/dashboard/expenses/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-5">
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.income)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
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
                          {new Date(transaction.expenseDate).toLocaleDateString(
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
            ) : (
              <div className="flex items-center justify-center">
                <AlertCircle className="mr-2 h-4 w-4" />
                No recent transactions
              </div>
            )}
            {recentTransactions.length > 0 && (
              <Button variant="ghost" className="mt-4 w-full" asChild>
                <Link to="/dashboard/expenses">View all transactions</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Fixed Expensens Details */}
        <Card>
          <CardHeader>
            <CardTitle>Fixed Expenses Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
