import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@sheet-hub/ui/components";
import { PageProps } from "~/.next/types/app/(app)/worlds/[world_id]/campaigns/[campaign]/page";
import { CreateCampaign } from "~/components/createCampaign";

export default function CampaignPage({ params }: PageProps) {
  const { world_id, campaign } = params;

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/worlds">Worlds</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* <BreadcrumbItem>{world.name}</BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-4">
        {/* <h1 className="text-2xl font-bold">{world.name}</h1>
        <p>{world.description}</p> */}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold">Campaigns</h2>
          {/* <CreateCampaign /> */}
        </div>
        <div className="flex flex-wrap justify-evenly gap-4">
          {/* {world.campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...{ campaign }} />
          ))} */}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">Sheets</h2>
        <div className="flex flex-wrap justify-evenly gap-4">
          {/* {world.sheets.map((sheet) => (
            <SheetCard key={sheet.id} {...{ sheet }} />
          ))} */}
        </div>
      </div>
    </div>
  );
}
