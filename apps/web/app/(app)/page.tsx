import { auth } from "~/auth";
import db from "~/lib/db";

export default async function Page() {
  const session = await auth();
  const user = await db?.user.findUniqueOrThrow({
    where: {
      email: session?.user?.email!,
    },
    include: {
      world: true,
    },
  });
  return (
    <main className="flex flex-1 flex-col w-full p-2 transition-all duration-300 ease-in-out">
      <div className="h-full rounded-md border-2 border-dashed overflow-hidden p-2">
        <div>
          <div className="flex items-center gap-2">
            <h1>Dashboard</h1>
          </div>
          <pre className="dark:bg-slate-800 p-2 gap-2 overflow-x-auto w-fit rounded-md">
            <code className="text-xs w-fit">
              {JSON.stringify(user, null, 2)}
            </code>
          </pre>
          <pre className="dark:bg-slate-800 p-2 gap-2 overflow-x-auto w-fit rounded-md">
            <code className="text-xs w-fit">
              {JSON.stringify(session, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </main>
  );
}
