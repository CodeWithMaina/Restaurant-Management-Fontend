// Layout.tsx
import { Outlet } from "react-router-dom";
import Card from "./Card";
import { CustomersideNav } from "../CustomerDashboard/customerSideNav";

export const Layout = () => {
  return (
    <div className="flex h-screen bg-black">
      <CustomersideNav />
      <main className="flex-1 overflow-hidden">
        <Card className="h-[calc(100vh-2rem)] overflow-y-auto">
          <Outlet />
        </Card>
      </main>
    </div>
  );
};