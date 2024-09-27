"use server";

import { DBExclusive } from "./_help";
import { auth } from "~/auth";
import assert from "assert";
import db from "~/lib/db";
import { Prisma, World } from "@sheet-hub/database";

type WorldData = Omit<
  Pick<World, "name"> | Partial<World>,
  DBExclusive | "ownerId"
>;
export async function CreateWorld(
  worldData: Omit<Prisma.WorldCreateInput, DBExclusive | "ownerId"> &
    Partial<Prisma.WorldCreateInput>,
) {
  "use server";
  const session = await auth();
  assert(session?.user?.id, "Session not found");
  const world = await db?.world.create({
    data: {
      ...(worldData as Prisma.WorldCreateInput),
      ownerId: worldData.ownerId ?? session?.user?.id,
      users: {
        ...worldData.users,
        connect: {
          ...worldData.users?.connect,
          id: session?.user?.id,
        },
      },
    },
  });
  assert(world, "World not created");
  return world;
}

export async function LoadWorlds(
  ids?: string[],
  options: Prisma.WorldInclude = {},
) {
  "use server";
  const session = await auth();
  assert(session?.user?.id, "Session not found");

  const userWorlds = await db?.world.findMany({
    where: {
      ...(ids ? { id: { in: ids } } : {}),
      users: {
        some: {
          id: session.user?.id!,
        },
      },
    },

    include: options,
    orderBy: {
      name: "asc",
    },
  });
  assert(userWorlds, "Something Went Wrong Loading Worlds");
  return userWorlds;
}
