"use client";
import { Campaign } from "@sheet-hub/database";
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Label,
  Input,
  DialogFooter,
  Textarea,
} from "@sheet-hub/ui/components";
import { toast } from "@sheet-hub/ui/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createCampaign } from "~/actions/campaign";

export function CreateCampaign({ worldId }: { worldId: string }) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Campaign</Button>
      </DialogTrigger>

      <DialogContent className="bg-background">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());

            let campaign: Campaign | undefined;
            try {
              campaign = await createCampaign(
                data.name as string,
                data.description as string,
              );
            } catch (error) {
              if (error instanceof Error) {
                toast({
                  title: "Error",
                  description: error.message,
                  variant: "destructive",
                });
                return;
              }

              toast({
                title: "Error",
                description: "Failed to create campaign",
                variant: "destructive",
              });
              return;
            }
            router.push(`/worlds/${worldId}/campaigns/${campaign?.id}`);
            console.log("campaign", campaign);
          }}
        >
          <DialogHeader>
            <DialogTitle>Create Campaign</DialogTitle>
            <DialogDescription>
              Create a new campaign for your world.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input required id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" variant={"secondary"}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
