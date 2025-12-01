import { useEffect } from "react";
import {useUserContext} from '../../hooks/useUserContext'
import CoverPhoto from "./CoverPhoto";
import ProfileCard from "./ProfileCard";
import NavOfAcountComponents from "./NavOfAcountComponents";

import { IoMdSettings } from "react-icons/io";
import PersonalDetails from "./PersonalDetails";



export default function Page() {

  const {userData, setUserData} = useUserContext()
  useEffect(() => console.log(userData), [userData])

  


  return (
    <div className="min-h-[2000px] space-y-4 bg-gray-100">
        
        <div className="bg-gradient-to-b from-[#999]/40 from-3% to-white shadow space-y-5">

          <div className=" w-full lg:max-w-[900px] m-auto space-y-6" >
            <CoverPhoto img={'./cover.jpg'}/>
            <div>
              <ProfileCard />
              <NavOfAcountComponents />
            </div>
          </div>

        </div>

        <div className="w-full lg:max-w-[900px] m-auto">
          <PersonalDetails/>
        </div>

    </div>
  )
}
