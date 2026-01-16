import { useLocation } from 'react-router-dom'
// import { useEffect } from "react";
// import {useUserContext} from '../../hooks/useUserContext'
// // import CoverPhoto from "../profile/CoverPhoto";
// import ProfileCard from "./ProfileCard";
// import NavOfAcountComponents from "./NavOfAcountComponents";
import { Outlet } from "react-router-dom";



export default function UserPage() {
    const location = useLocation()
    const lastPathName = location.pathname.split('/').pop()


  return (
    <div>{lastPathName}</div>
  )
}
