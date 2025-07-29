import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoading: authLoading, pb } = useAuth();

  // Handle redirect if already authenticated
  useEffect(() => {
    if (pb.authStore.isValid) {
      navigate({ to: "/dashboard" });
    }
  }, [navigate, pb.authStore.isValid]);

  // if (authLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Loader2 className="h-8 w-8 animate-spin" />
  //     </div>
  //   );
  // }

  const randomQuote = {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const result = await login({ email, password });
      if (result.success) {
        navigate({ to: "/dashboard" });
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image and Quote */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white lg:w-1/2">
        <div className="text-2xl font-bold">Expensely</div>
        <div className="space-y-6 max-w-md">
          <div className="text-4xl font-bold leading-tight">
            {randomQuote.text}
          </div>
          <div className="text-lg text-blue-100">— {randomQuote.author}</div>
        </div>
        <div className="text-sm text-blue-200">
          Track. Analyze. Optimize. Your finances, simplified.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md p-8">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-center">
                Welcome!
              </CardTitle>
              <CardDescription className="text-center space-y-4">
                <p className="mb-4">Login to your account to continue</p>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                      className="text-base h-12"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                      className="text-base h-12"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-lg hover:bg-green-700 h-12"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <GoogleLoginButton /> */}
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
