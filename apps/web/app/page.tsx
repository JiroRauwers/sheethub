import { Button } from "@sheet-hub/ui/components/ui/button";
import db from "~/lib/db";

export default async function Page() {
  const users = await db?.user.findMany();
  return (
    <main>
      <Button variant={"destructive"}>Click me</Button>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </main>
  );
}
