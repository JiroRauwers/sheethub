"use client";
import { World } from "@sheet-hub/database";
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
import { createWorld } from "~/actions/world";

export function CreateWorld() {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create World</Button>
      </DialogTrigger>

      <DialogContent className="bg-background">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());

            let world: World | undefined;
            try {
              world = await createWorld({
                name: data.name as string,
                description: data.description as string,
                image: data.image as string,
                color: data.color as string,
              });
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
                description: "Failed to create world",
                variant: "destructive",
              });
              return;
            }
            router.push(`/worlds/${world?.id}`);
            console.log("world", world);
          }}
        >
          <DialogHeader>
            <DialogTitle>Create World</DialogTitle>
            <DialogDescription>Create a new world.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input id="image" name="image" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input required id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
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
