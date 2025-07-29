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
    <div className="flex flex-col min-h-screen">
      {/* Mobile header */}
      <MobileHeader user={user} />

      <div className="flex">
        <main className="flex flex-row h-screen flex-1 overflow-y-auto bg-gray-50">
          <Sidebar user={user} />
          <div className="w-full mx-auto p-4 ml-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
