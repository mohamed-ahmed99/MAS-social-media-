import { useEffect } from "react";
import {useUserContext} from '../../hooks/useUserContext'
import CoverPhoto from "./CoverPhoto";
import ProfileCard from "./ProfileCard";
import NavOfAcountComponents from "./NavOfAcountComponents";
import { Outlet } from "react-router-dom";

import { useState } from "react";

export default function ProfilePage() {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Profile - MAS Social Media"
  }, [])

  const {userData, setUserData} = useUserContext()
  useEffect(() => console.log(userData), [userData])


  
  return (
    <div className="min-h-screen space-y-0 lg:space-y-4 bg-gray-100 pb-4">
        
        <div className="bg-gradient-to-b from-[#999]/40 from-3% to-white shadow space-y-5">

          <div className=" w-full lg:max-w-[900px] m-auto space-y-6" >
            <CoverPhoto img={'/cover.jpg'}/>
            <div>
              <ProfileCard userData={userData}/>
              <NavOfAcountComponents />
            </div>
          </div>

        </div>



          <Outlet/>
           


    </div>
  )
}




// {show === 'friends' && 
//           <div className="lg:max-w-[900px] bg-white m-auto rounded-xl p-4 lg:shadow ">
//             <AllFriends/>
//           </div>
        
//         } 