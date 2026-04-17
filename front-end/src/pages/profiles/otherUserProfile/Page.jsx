import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetMethod } from '../../../hooks/useGetMethod'


// components
import CoverPhoto from '../CoverPhoto.jsx'
import ProfileCard from '../ProfileCard.jsx'
import LoadingProfileCard from '../LoadingProfileCard.jsx'
import ProfileContent from '../ProfileContent.jsx'



function OtherProfile() {

    // get data from api
    const { getData, status_g, data_g, loading_g } = useGetMethod()
    const location = useLocation() // get location
    
    // get username and user id from location
    const username = location.pathname.split('/').pop()
    const userId = username.split('-').pop() 

    // get user data
    useEffect(() => {
        getData(`/api/users/getuser/${userId}`)
    }, [userId])

    // page title and scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `MAS-${username}`
    }, [])
    

  return (
    <div className="min-h-screen relative space-y-0 lg:space-y-4 bg-gray-100 pb-4">
                
        <div className="bg-gradient-to-b from-[#999]/40 from-3% to-white shadow space-y-5">
        
            {/* cover and profile card container */}
            <div className=" w-full lg:max-w-[900px] m-auto space-y-6 " >
              {/* cover photo */}
              <CoverPhoto 
                img={'/cover.jpg'} 
                edit={false}
              />
    
              {/* profile card */}
              <div>
                {loading_g ? (
                  <LoadingProfileCard />
                ) : (
                  <ProfileCard 
                    setCreatePost={null}
                    edit={false}
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
                edit={false} 
                setCreatePost={null}
            />
        </div>
    
    </div>
  )
}

export default OtherProfile