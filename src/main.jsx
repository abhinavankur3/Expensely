import "./index.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "@/contexts/auth-context";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create the router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined, // This will be set by the AuthProvider
  },
});

function App() {
  const auth = useAuth();
  return (
    <AuthProvider>
      <RouterProvider router={router} context={{ auth }} />
    </AuthProvider>
  );
}

// Render the app
const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
