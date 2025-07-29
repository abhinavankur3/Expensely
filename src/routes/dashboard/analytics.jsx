import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  PieChart,
  Pie,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from "react";

// Mock data - replace with actual data from your API
const monthlyData = [
  { name: "Jan", fixed: 1200, variable: 800 },
  { name: "Feb", fixed: 1200, variable: 950 },
  { name: "Mar", fixed: 1200, variable: 1100 },
  { name: "Apr", fixed: 1200, variable: 900 },
  { name: "May", fixed: 1250, variable: 1000 },
  { name: "Jun", fixed: 1250, variable: 1200 },
  { name: "Jul", fixed: 1250, variable: 1050 },
];

const categoryData = [
  { name: "Housing", value: 1200 },
  { name: "Utilities", value: 300 },
  { name: "Food", value: 650 },
  { name: "Transportation", value: 350 },
  { name: "Entertainment", value: 200 },
  { name: "Other", value: 150 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPageWithLayout,
});

function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");

  // Filter data based on selected time range
  const getFilteredData = () => {
    switch (timeRange) {
      case "3m":
        return monthlyData.slice(-3);
      case "6m":
      default:
        return monthlyData;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <div className="flex space-x-2">
          <Button
            variant={timeRange === "3m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("3m")}
          >
            Last 3 Months
          </Button>
          <Button
            variant={timeRange === "6m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("6m")}
          >
            Last 6 Months
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getFilteredData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="fixed"
                  stroke="#3b82f6"
                  name="Fixed Expenses"
                />
                <Line
                  type="monotone"
                  dataKey="variable"
                  stroke="#10b981"
                  name="Variable Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getFilteredData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fixed" name="Fixed Expenses" fill="#3b82f6" />
                <Bar
                  dataKey="variable"
                  name="Variable Expenses"
                  fill="#10b981"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Add layout wrapper
export default function AnalyticsPageWithLayout() {
  return (
    <DashboardLayout>
      <AnalyticsPage />
    </DashboardLayout>
  );
}
