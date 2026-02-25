import { useLocation } from 'react-router-dom'
import CoverPhoto from "../profile/CoverPhoto";
import ProfileCard from "../profile/ProfileCard";
import NavOfAcountComponents from "./NavOfAcountComponents";
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';

// my hooks
import {pageTop} from '../../hooks/someFunctions'
import {useGetFromServer} from '../../hooks/getFromServer'
import {useGetMethod} from '../../hooks/useGetMethod'

export default function UserPage() {

  const location = useLocation()
  const {getData, status_g, message_g, data_g, loading_g} = useGetMethod()
  

  const lastPathName = location.pathname.split('/').pop()
  const userId = location.pathname.split('-').pop();


  // http://localhost:5150/api/users/getuser/${userId}
  // https://masproback.vercel.app/api/users/getuser/${userId}
  const url = `http://localhost:5150/api/users/getuser/${userId}`

  useEffect(() => {
    getData(url)
  }, [url])

  console.log("user data",data_g)

  pageTop(`${lastPathName} - MAS Social Media`) // to go to the top of page


  const otherUserData = {
    loading:loading_g,
    userData:data_g?.user?.personalInfo,
    relationshipWithYou:data_g?.user?.relationshipWithYou
  }

  return (
    <div className="min-h-screen space-y-0 lg:space-y-4 bg-gray-100 pb-4">
            
            <div className="bg-gradient-to-b from-[#999]/40 from-3% to-white shadow space-y-5">
    
              <div className=" w-full lg:max-w-[900px] m-auto space-y-6" >
                <CoverPhoto img={'/cover.jpg'} edit={false}/>
                <div>
                  <ProfileCard edit={false} otherUserData={otherUserData}/>
                  <NavOfAcountComponents />
                </div>
              </div>
    
            </div>

              <Outlet/>
               
        </div>
  )
}
