import { useEffect } from "react";
import {useUserContext} from '../../hooks/useUserContext'
import CoverPhoto from "./CoverPhoto";

import { IoMdSettings } from "react-icons/io";



export default function Profile() {

  const {userData, setUserData} = useUserContext()
  useEffect(() => console.log(userData), [userData])

  


  return (
    <div className="min-h-[2000px]">
        
        <div className="bg-gradient-to-b from-[#222]/40 from-3% to-white">

          <div className=" w-full lg:max-w-[900px] m-auto " >
            <CoverPhoto img={'./cover.jpg'}/>
          </div>
          
        </div>

    </div>
  )
}
