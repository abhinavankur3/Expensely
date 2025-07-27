import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/")({
  component: IndexRouteComponent,
});

function IndexRouteComponent() {
  const navigate = useNavigate();
  return (
    <div className="p-8">
      <div className="w-full flex justify-between">
        <p className="text-4xl font-bold">Expensely</p>
        <Button
          size="lg"
          onClick={() => {
            navigate({
              to: "/login",
            });
          }}
        >
          Login
        </Button>
      </div>
      <Separator className="my-4" />
      <div></div>
    </div>
  );
}
