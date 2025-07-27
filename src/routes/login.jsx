import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const randomQuote = {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
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
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome!
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <GoogleLoginButton /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
