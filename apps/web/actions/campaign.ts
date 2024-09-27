"use server";

import { Prisma } from "@sheet-hub/database";
import assert from "assert";
import { auth } from "~/auth";
import db from "~/lib/db";

export async function createCampaign(name: string, description: string) {
  "use server";
  const session = await auth();
  const user = await db?.user.findUniqueOrThrow({
    where: { email: session?.user?.email! },
  });
  if (!user || !user.currentWorldId) return;

  let findCampaign = await db?.campaign.findFirst({
    where: {
      WorldId: user.currentWorldId,
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (findCampaign) throw new Error("Campaign already exists");

  const campaign = await db?.campaign.create({
    data: {
      name: name,
      description: description,
      WorldId: user.currentWorldId,
    },
  });

  if (!campaign) throw new Error("Failed to create campaign");

  return campaign;
}

export async function loadCampaigns(
  ids?: string[],
  include: Prisma.CampaignInclude = {},
) {
  "use server";
  const session = await auth();
  assert(session?.user?.id, "Session not found");

  const campaigns = await db?.campaign.findMany({
    include,
    where: {
      // the user is in the campaign or the world owner
      OR: [
        {
          Sheet: {
            some: {
              Users: {
                some: {
                  id: session.user.id,
                },
              },
            },
          },
        },
        {
          World: {
            ownerId: session.user.id,
          },
        },
      ],
      ...(ids ? { id: { in: ids } } : {}),
    },
    orderBy: {
      name: "asc",
    },
  });
  assert(campaigns, "Failed to load campaigns");
  return campaigns;
}
