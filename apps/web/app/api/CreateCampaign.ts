"use server";

import { auth } from "~/auth";
import db from "~/lib/db";

export async function CreateCampaign() {
  "use server";
  const session = await auth();
  const user = await db?.user.findUniqueOrThrow({
    where: { email: session?.user?.email! },
  });
  if (!user || !user.currentWorldId) return;

  const campaign = await db?.campaign.create({
    data: {
      name: "New Campaign",
      description: "Description of the new campaign",
      WorldId: user.currentWorldId,
    },
  });

  if (!campaign) throw new Error("Failed to create campaign");

  return campaign;
}
