import { Outlet } from "react-router"
import Card from "./Card"
import { AdminSideNav } from "../AdminDashboard/AdminSideNav"
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { RestaurantOwnerSideNav } from "../RestaurantOwnerDashboard/RestaurantOwnerSideNav";
import { CustomersideNav } from "../CustomerDashboard/customerSideNav";
import LoginPage from "../../pages/Login";

export const Layout = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const userType = user ? user?.userType : null;

  const renderSideNav = () => {
    switch (userType) {
      case "admin":
        return <AdminSideNav />;
      case "restaurant_owner":
        return <RestaurantOwnerSideNav />;
      case "customer":
        return <CustomersideNav />;
      default:
        // You might want to return null or a default nav here
        return <LoginPage/>;
    }
  };

  return (
    <div className="flex overflow-hidden">
      {/* <AdminSideNav/> */}
      {renderSideNav()}
      <main className="flex-1 overflow-y-auto p-1 md:p-4 bg-black">
        <Card className="min-h-[calc(100vh-2rem)]">
          <Outlet />
        </Card>
      </main>
    </div>
  )
}
