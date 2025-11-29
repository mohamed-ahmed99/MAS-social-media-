import { useEffect } from "react";
import {useUserContext} from '../../hooks/useUserContext'
import CoverPhoto from "./CoverPhoto";
import ProfileCard from "./ProfileCard";
import NavOfAcountComponents from "./NavOfAcountComponents";

import { IoMdSettings } from "react-icons/io";



export default function Page() {

  const {userData, setUserData} = useUserContext()
  useEffect(() => console.log(userData), [userData])

  


  return (
    <div className="min-h-[2000px] space-y-8 bg-gray-100">
        
        <div className="bg-gradient-to-b from-[#999]/40 from-3% to-white shadow">

          <div className=" w-full lg:max-w-[900px] m-auto space-y-6" >
            <CoverPhoto img={'./cover.jpg'}/>
            <ProfileCard />
            <NavOfAcountComponents />
          </div>
          
        </div>

        <div className="h-[2000px] bg-white">dddddddddd</div>

    </div>
  )
}
