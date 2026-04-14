import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";



// components
import CoverPhoto from "../../oldProfile/CoverPhoto";
import ProfileCard from "../../oldProfile/ProfileCard";
import NavOfAcountComponents from "../../oldProfile/NavOfAcountComponents";
import CreatePostAlert from "../../../components/createPostAlert/CreatePostAlert.jsx";


// my hooks
import { useGetMethod } from "../../../hooks/useGetMethod";


export default function Page() {


  // page title and scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Profile - MAS Social Media"
  }, [])

  // get user data
  const { getData, status_g, message_g, data_g, loading_g, action_g } = useGetMethod()
  useEffect(() => {
    // end point for get user data
    getData("/api/users/me/profile")
  }, [])

  console.log('my profile', { status_g, message_g, data_g, loading_g, action_g })



  return (
    <div className="min-h-screen relative space-y-0 lg:space-y-4 bg-gray-100 pb-4">
      {/* {createPost && <CreatePostAlert setCreatePost={setCreatePost}/>}
            
      <div className="bg-gradient-to-b from-[#999]/40 from-3% to-white shadow space-y-5">
    
        <div className=" w-full lg:max-w-[900px] m-auto space-y-6" >
          <CoverPhoto img={'/cover.jpg'} edit={true}/>
          <div>
            <ProfileCard userData={userData.user} edit={true} setCreatePost={setCreatePost}/>
            <NavOfAcountComponents />
          </div>
        </div>
    
      </div> */}

    </div>
  )
}