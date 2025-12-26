import SideBare from "./SideBare"
import { Outlet } from "react-router-dom"
import TopBar from "./TopBar"

export default function FriendsPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex gap-4 flex-col lg:flex-row ">
      <SideBare/>
      <TopBar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
