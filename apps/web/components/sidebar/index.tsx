import { Button } from "@sheet-hub/ui/components";
import { logout } from "~/app/api/logout";

export const AppSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-foreground border-r">
      <div className="flex flex-col justify-between p-2 h-full">
        <div>
          <div className="p-2">Sidebar</div>
        </div>
        <div className="mt-auto">
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </aside>
  );
};
