import { Sheet } from "@sheet-hub/database";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sheet-hub/ui/components";
import { notFound } from "next/navigation";
import { PageProps } from "~/.next/types/app/(app)/worlds/[world]/campaigns/[campaign]/page";
import { loadCampaigns } from "~/actions/campaign";

export default async function CampaignPage(props: PageProps) {
  const [campaign] = await loadCampaigns([props.params.campaign], {
    Sheet: true,
    World: true,
  });
  if (!campaign) return notFound();
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/worlds">Worlds</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/worlds/${campaign?.World.id}`}>
              {campaign?.World.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{campaign?.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{campaign.name}</h1>
        <p>{campaign.description}</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold">Sheets</h2>
        </div>
        <div className="flex flex-wrap justify-evenly gap-4">
          {campaign.Sheet.map((sheet) => (
            <SheetCard key={sheet.id} {...{ sheet }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const SheetCard = ({ sheet }: { sheet: Sheet }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{sheet.name}</CardTitle>
        {/* <CardDescription>{sheet.description}</CardDescription> */}
      </CardHeader>
    </Card>
  );
};
