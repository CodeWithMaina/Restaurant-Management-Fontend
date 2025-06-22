import { Outlet } from "react-router-dom";
import Card from "./Card";
import { SideNav } from "./SideNav";

export const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <main className="flex-1 overflow-y-auto p-1 md:p-4 bg-black">
        <Card className="min-h-[calc(100vh-2rem)]">
          <Outlet />
        </Card>
      </main>
    </div>
  );
};