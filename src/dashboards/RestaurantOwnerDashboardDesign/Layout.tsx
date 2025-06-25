import { Outlet } from "react-router-dom";
import Card from "./Card";
import { RestaurantOwnerSideNav } from "../RestaurantOwnerDashboard/RestaurantOwnerSideNav";

export const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <RestaurantOwnerSideNav />
      <main className="flex-1 overflow-y-auto p-1 md:p-4">
        <Card className="min-h-[calc(100vh-2rem)]">
          <Outlet />
        </Card>
      </main>
    </div>
  );
};