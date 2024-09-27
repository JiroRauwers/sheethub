"use server";

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
  console.log("findCampaign", findCampaign);
  console.log("name", name);

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
