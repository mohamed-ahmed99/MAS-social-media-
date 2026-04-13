import { useEffect } from "react";
import {useUserContext} from '../../hooks/useUserContext'
import CoverPhoto from "./CoverPhoto";
import ProfileCard from "./ProfileCard";
import NavOfAcountComponents from "./NavOfAcountComponents";
import { Outlet } from "react-router-dom";

import CreatePostAlert from "../../components/createPostAlert/CreatePostAlert.jsx";

import { useState } from "react";

export default function ProfilePage() {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Profile - MAS Social Media"
  }, [])

  const {userData, setUserData} = useUserContext()
  const [createPost, setCreatePost] = useState(false)


  
  return (
    <div className="min-h-screen relative space-y-0 lg:space-y-4 bg-gray-100 pb-4">
        {createPost && <CreatePostAlert setCreatePost={setCreatePost}/>}
        
        <div className="bg-gradient-to-b from-[#999]/40 from-3% to-white shadow space-y-5">

          <div className=" w-full lg:max-w-[900px] m-auto space-y-6" >
            <CoverPhoto img={'/cover.jpg'} edit={true}/>
            <div>
              <ProfileCard userData={userData.user} edit={true} setCreatePost={setCreatePost}/>
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