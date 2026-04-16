import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";



// components
import CoverPhoto from "../CoverPhoto.jsx";
import ProfileCard from "../ProfileCard.jsx";
import CreatePostAlert from "../../../components/createPostAlert/CreatePostAlert.jsx";
import LoadingProfileCard from "../LoadingProfileCard.jsx";
import ProfileContent from "../ProfileContent.jsx";


// my hooks
import { useGetMethod } from "../../../hooks/useGetMethod";


export default function Page() {
  // hook to get data from server
  const { getData, status_g, message_g, data_g, loading_g, action_g } = useGetMethod()


  // states
  const [createPost, setCreatePost] = useState(false)



  // call server to get data of my profile
  useEffect(() => {
    // end point for get user data
    getData("/api/users/me/profile")
  }, [])

  console.log('my profile', { status_g, message_g, data_g, loading_g, action_g })




  // page title and scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Profile - MAS Social Media"
  }, [])


  return (
    <div className="min-h-screen relative space-y-0 lg:space-y-4 bg-gray-100 ">
      {createPost && <CreatePostAlert setCreatePost={setCreatePost}/>}
            
      <div className="bg-gradient-to-b from-[#999]/40 from-3% to-white shadow space-y-5">
    
        {/* cover and profile card container */}
        <div className=" w-full lg:max-w-[900px] m-auto space-y-6 " >
          {/* cover photo */}
          <CoverPhoto 
            img={'/cover.jpg'} 
            edit={true}
          />

          {/* profile card */}
          <div>
            {loading_g ? (
              <LoadingProfileCard />
            ) : (
              <ProfileCard 
                setCreatePost={setCreatePost}
                edit={true}
                userData={data_g?.user}
              />
            )}
          </div>
        </div>
      </div>

       {/* personal info & friends & posts */}
        <div className="">
            <ProfileContent 
                userData={data_g?.user} 
                posts={data_g?.posts} 
                edit={true} 
                setCreatePost={setCreatePost}
            />
        </div>

    </div>
  )
}