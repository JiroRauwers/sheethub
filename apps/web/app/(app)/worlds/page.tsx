import { World } from "@sheet-hub/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sheet-hub/ui/components/ui/card";
import { Separator } from "@sheet-hub/ui/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { loadWorlds } from "~/actions/world";
import { CreateWorld } from "~/components/createWorld";

export default async function WorldsPage() {
  const worlds = await loadWorlds();

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Worlds</h1>
        <CreateWorld />
      </div>
      <div className="flex flex-wrap justify-evenly gap-4">
        {worlds.map((world) => (
          <WorldCard key={world.id} {...{ world }} />
        ))}
        {worlds.length % 2 == 1 && (
          <div className="w-64 h-64 pointer-events-none" />
        )}
      </div>
    </div>
  );
}

const WorldCard = ({ world }: { world: World }) => {
  return (
    <Link href={`/worlds/${world.id}`}>
      <Card className="group aspect-[3/4] p-1 w-64 flex-grow hover:scale-105 transition-all duration-300 cursor-pointer select-none">
        <CardHeader className="rounded-lg relative overflow-hidden aspect-video flex items-end">
          <Image
            src={`https://picsum.photos/seed/${world.id}/500/200`}
            className="bg-gray-100 object-cover group-hover:scale-110 transition-all duration-300"
            alt="Random world image"
            fill
          />
        </CardHeader>
        <CardContent className="p-2">
          <CardTitle className="z-10 capitalize">{world.name}</CardTitle>
          <Separator className="my-2" />
          <CardDescription>{world.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
