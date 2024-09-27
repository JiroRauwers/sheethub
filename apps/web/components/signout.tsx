import { Button } from "@sheet-hub/ui/components/ui/button";
import { logout } from "~/app/api/logout";

export const SignOut = () => {
  return (
    <form action={() => logout()}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
};
