import { logout } from "~/app/api/logout";
import { auth } from "~/auth";

export default function LogoutPage() {
  logout();
  const session = auth();
  return <div>{JSON.stringify(session)}</div>;
}
