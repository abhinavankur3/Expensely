import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Home, PlusCircle, LineChart, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export function MobileHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Add Expense', icon: PlusCircle, href: '/dashboard/expenses/add' },
    { name: 'Analytics', icon: LineChart, href: '/dashboard/analytics' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between h-16 px-4 bg-white border-b">
        <h1 className="text-xl font-bold text-blue-600">Expense Tracker</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                activeProps={{
                  className: "bg-blue-50 text-blue-600"
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-md"
            >
              <LogOut className="mr-3 h-6 w-6" />
              Sign out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
