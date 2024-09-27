import { getWorldByName, loadWorlds, selectWorld } from "~/actions/world";
import { notFound } from "next/navigation";
import { Campaign, Sheet, World } from "@sheet-hub/database";
import Link from "next/link";
import Image from "next/image";
import {
  Separator,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@sheet-hub/ui/components";

import { CreateCampaign } from "~/components/createCampaign";
import { PageProps } from "~/.next/types/app/(app)/worlds/[world]/page";

export default async function WorldPage(props: PageProps) {
  const [world] = await loadWorlds([props.params.world], {
    campaigns: true,
    sheets: true,
    users: true,
  });
  try {
    await selectWorld(props.params.world);
  } catch (error) {
    console.error(error);
    return notFound();
  }

  if (!world) return notFound();

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/worlds">Worlds</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{world.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{world.name}</h1>
        <p>{world.description}</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold">Campaigns</h2>
          <CreateCampaign worldId={world.id} />
        </div>
        <div className="flex flex-wrap justify-evenly gap-4">
          {world.campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...{ campaign }} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">Sheets</h2>
        <div className="flex flex-wrap justify-evenly gap-4">
          {world.sheets.map((sheet) => (
            <SheetCard key={sheet.id} {...{ sheet }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  return (
    <Link href={`/worlds/${campaign.WorldId}/campaigns/${campaign.id}`}>
      <Card className="group aspect-[3/4] p-1 w-64 hover:scale-105 transition-all duration-300 cursor-pointer select-none">
        <CardHeader className="rounded-lg relative overflow-hidden aspect-video flex items-end">
          <Image
            src={`https://picsum.photos/seed/${campaign.id}/500/200`}
            className="bg-gray-100 object-cover group-hover:scale-110 transition-all duration-300"
            alt="Random campaign image"
            fill
          />
        </CardHeader>
        <CardContent className="p-2">
          <CardTitle className="z-10 capitalize">{campaign.name}</CardTitle>
          <Separator className="my-2" />
          <CardDescription>{campaign.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

const SheetCard = ({ sheet }: { sheet: Sheet }) => {
  return (
    <Link href={`/worlds/${sheet.Worldid}/sheets/${sheet.id}`}>
      <Card className="group aspect-[3/4] p-1 w-64 hover:scale-105 transition-all duration-300 cursor-pointer select-none">
        <CardHeader className="rounded-lg relative overflow-hidden aspect-video flex items-end">
          <Image
            src={`https://picsum.photos/seed/${sheet.id}/500/200`}
            className="bg-gray-100 object-cover group-hover:scale-110 transition-all duration-300"
            alt="Random sheet image"
            fill
          />
        </CardHeader>
        <CardContent className="p-2">
          <CardTitle className="z-10 capitalize">{sheet.name}</CardTitle>
          <Separator className="my-2" />
          {/* <CardDescription>{sheet.description}</CardDescription> */}
        </CardContent>
      </Card>
    </Link>
  );
};
