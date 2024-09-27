"use server";
import { auth } from "~/auth";
import { assert } from "console";
import db from "~/lib/db";

export async function GetUser() {
  "use server";
  console.log("GetUser");
  const session = await auth();
  assert(session?.user?.id, "Session not found");

  const user = await db?.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  assert(user, "User not found");
  return user;
}
export async function GetUsersById(ids: string[]) {
  "use server";
  const users = await db?.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  assert(users, "Users not found");
  return users;
}

export async function test(fn: () => string) {
  "use server";
  console.log("test");
  console.log({ fn });
  const result = await fn();
  return result;
}
