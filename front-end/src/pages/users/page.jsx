import { useLocation } from 'react-router-dom'
import CoverPhoto from "../profile/CoverPhoto";
import ProfileCard from "../profile/ProfileCard";
import NavOfAcountComponents from "./NavOfAcountComponents";
import { Outlet } from "react-router-dom";

// my hooks
import {pageTop} from '../../hooks/someFunctions'
import {useGetFromServer} from '../../hooks/getFromServer'

export default function UserPage() {

  const location = useLocation()
  const lastPathName = location.pathname.split('/').pop()
  const userId = location.pathname.split('-').pop();

  const token = localStorage.getItem("MASproAuth")
  const url = `http://localhost:5150/api/users/getuser/${userId}`
  const {status, message, data, loading} = useGetFromServer(url, {headers:{authorization:`Bearer ${token}`}})
  console.log("user data",data?.user?.personalInfo?.firstName)

  pageTop(`${lastPathName} - MAS Social Media`) // to go to the top of page



  return (
    <div className="min-h-screen space-y-0 lg:space-y-4 bg-gray-100 pb-4">
            
            <div className="bg-gradient-to-b from-[#999]/40 from-3% to-white shadow space-y-5">
    
              <div className=" w-full lg:max-w-[900px] m-auto space-y-6" >
                <CoverPhoto img={'/cover.jpg'} edit={false}/>
                <div>
                  <ProfileCard edit={false} otherUserData={{loading:loading, userData:data?.user?.personalInfo}}/>
                  <NavOfAcountComponents />
                </div>
              </div>
    
            </div>

              <Outlet/>
               
        </div>
  )
}
