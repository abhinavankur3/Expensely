import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { redirect } from "@tanstack/react-router";
import PocketBase from "pocketbase";

// Initialize PocketBase client
const pb = new PocketBase(import.meta.env.VITE_API_BASE_URL);

export const AuthContext = createContext({
  user: null,
  pb: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pbInstance] = useState(() => pb);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have a valid auth store
        if (pbInstance.authStore.isValid) {
          // Get the auth record
          const authData = pbInstance.authStore.record;
          if (authData) {
            setUser(authData);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pbInstance]);

  const login = async ({ email, password }) => {
    try {
      const authData = await pbInstance
        .collection("users")
        .authWithPassword(email, password);
      setUser(authData.record);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error:
          error.message || "Failed to log in. Please check your credentials.",
      };
    }
  };

  const logout = async () => {
    try {
      pbInstance.authStore.clear();
      setUser(null);
      redirect({ to: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      pb: pbInstance,
      isLoading,
      login,
      logout,
    }),
    [user, pbInstance, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
