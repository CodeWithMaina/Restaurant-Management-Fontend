// Layout.tsx
import { Outlet } from "react-router-dom";
import Card from "./Card";
import { SideNav } from "./SideNav";

export const Layout = () => {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-1 p-1 bg-gray-100">
        <Card>
          <Outlet />
        </Card>
      </div>
    </div>
  );
};