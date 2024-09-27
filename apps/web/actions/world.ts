"use server";

import { DBExclusive } from "./_help";
import { auth } from "~/auth";
import assert from "assert";
import db from "~/lib/db";
import { Prisma } from "@sheet-hub/database";

export async function selectWorld(worldId: string) {
  "use server";
  const session = await auth();
  assert(session?.user?.id, "Session not found");

  const world = await db?.world.findUnique({
    where: {
      id: worldId,
      users: {
        some: {
          id: session.user.id,
        },
      },
    },
  });
  if (!world) throw new Error("World not found");

  await db?.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      currentWorldId: world.id,
    },
  });
  return world;
}

export async function createWorld(
  worldData: Omit<Prisma.WorldCreateInput, "ownerId" | DBExclusive> & {
    ownerId?: string;
  },
) {
  "use server";
  const session = await auth();
  assert(session?.user?.id, "Session not found");
  const world = await db?.world.create({
    data: {
      ...worldData,
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

export async function loadWorlds(
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

export async function getWorldByName(
  name: string,
  include: Prisma.WorldInclude = {},
) {
  "use server";
  const session = await auth();
  assert(session?.user?.id, "Session not found");

  const world = await db?.world.findFirstOrThrow({
    where: {
      name,
      users: {
        some: {
          id: session.user?.id!,
        },
      },
    },
    include,
  });
  return world;
}
