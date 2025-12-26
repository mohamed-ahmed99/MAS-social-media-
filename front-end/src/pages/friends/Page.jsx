import SideBare from "./SideBare"
import { Outlet } from "react-router-dom"
import TopBar from "./TopBar"

import { useLocation } from "react-router-dom"

export default function FriendsPage() {
  

  const location = useLocation()
  const lastPathName = location.pathname.split('/').pop()
  const title = lastPathName.includes('_') ? lastPathName.replace('_', ' ') : lastPathName





  return (
    <div className="bg-gray-100 min-h-screen flex gap-4 flex-col md:flex-row ">
      <SideBare/>
      <TopBar/>



      <div>
        <div>
          <p>{title}</p>
          {/* edit friends  */}
          <div></div>
        </div>

        <Outlet/>
      </div>
    </div>
  )
}
