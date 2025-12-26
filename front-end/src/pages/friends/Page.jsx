import SideBare from "./SideBare"
import { Outlet } from "react-router-dom"
import TopBar from "./TopBar"

import { useLocation } from "react-router-dom"

export default function FriendsPage() {
  

  const location = useLocation()
  const lastPathName = location.pathname.split('/').pop()
  const title = lastPathName.includes('_') ? lastPathName.replace('_', ' ') : lastPathName





  return (
    <div className="bg-gray-100 min-h-screen flex lmd:gap-4 flex-col md:flex-row ">
      <SideBare/>
      <TopBar/>



      <div className="w-full">
        <div className="mb-4 lmd:mt-3 px-2">
          <p className="hidden lmd:block text-xl font-semibold text-stone-700 ">{title}</p>
          {/* edit friends  */}
          <div></div>
        </div>

        <Outlet/>
      </div>
    </div>
  )
}
