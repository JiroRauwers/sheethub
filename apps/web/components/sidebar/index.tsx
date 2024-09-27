import { SignOut } from "../signout";

export const AppSidebar = () => {
  return (
    <aside className="w-64 h-screen bg-foreground border-r">
      <div className="flex flex-col justify-between p-2 h-full">
        <div>
          <div className="p-2">Sidebar</div>
        </div>
        <div className="mt-auto">
          <SignOut />
        </div>
      </div>
    </aside>
  );
};
