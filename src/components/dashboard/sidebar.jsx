import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Home, LineChart, Settings, LogOut, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  const navItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "Expenses", icon: TrendingUp, href: "/dashboard/expenses" },
    { name: "Analytics", icon: LineChart, href: "/dashboard/analytics" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const activeItem = navItems.find(
    (item) => item.href === window.location.pathname
  );
  return (
    <div className="hidden md:flex md:flex-col w-64 bg-white mt-16">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 ${activeItem?.name === item.name ? "bg-blue-600 text-white" : ""}`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4">
          <Button
            variant="destructive"
            className="w-full justify-start text-white hover:bg-gray-100 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
