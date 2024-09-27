import { Button } from "@sheet-hub/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@sheet-hub/ui/components/ui/card";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
