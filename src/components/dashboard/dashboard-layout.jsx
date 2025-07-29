import { useNavigate } from "@tanstack/react-router";
import { Sidebar } from "./sidebar";
import { MobileHeader } from "./mobile-header";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

/**
 * DashboardLayout component that wraps all dashboard routes
 * Handles authentication and provides the common layout for dashboard pages
 */
export function DashboardLayout({ children }) {
  const { pb, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !pb.authStore.isValid) {
      navigate({ to: "/login" });
    }
  }, [pb.authStore.isValid, isLoading, navigate]);

  // Show loading state while checking auth
  if (isLoading || !pb.authStore.isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="top-0 left-0 right-0 fixed flex items-center justify-between h-16 flex-shrink-0 px-4 bg-blue-600">
        <h1 className="hidden md:block text-white text-xl font-bold">
          Expense Tracker
        </h1>
        <p className="text-white text-xl font-bold">Hi {user?.name}!</p>
      </div>

      {/* Mobile header */}
      <MobileHeader user={user} />

      <div className="flex">
        <main className="flex flex-row h-screen flex-1 overflow-y-auto bg-cyan-50">
          <Sidebar user={user} />
          <div className="w-full mx-auto p-4 ml-4 mt-16">{children}</div>
        </main>
      </div>
    </div>
  );
}
