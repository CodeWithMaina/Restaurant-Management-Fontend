import { Outlet } from "react-router"
import Card from "./Card"
import { SideNav } from "./SideNav"

export const Layout = () => {
  return (
    <div className="flex">
        <div className="min-w-[20%]">
          <SideNav/>
        </div>
        <div className="min-w-80% h-fit">
            <Card>
              <Outlet/>
            </Card>
        </div>
    </div>
    )
}
