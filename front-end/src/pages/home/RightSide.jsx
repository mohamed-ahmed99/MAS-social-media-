import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {useGetFromServer} from '../../hooks/getFromServer'
import { useEffect } from "react";
import {useUserContext} from '../../hooks/useUserContext'

export default function RightSide() {
  const {userData, setUserData} = useUserContext()

  const token = localStorage.getItem("MASproAuth")

  // http://localhost:5150/api/users/get-users?limit=10&page=1
  // https://masproback.vercel.app/api/users/get-users?limit=10&page=1
  const url = `https://masproback.vercel.app/api/users/get-users?limit=10&page=1`

  const {status, message, data, loading} = useGetFromServer(url, {headers:{authorization:`Bearer ${token}`}})




// {{dev}}/api/users/get-users?limit=10&page=1

  const localData = [
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 2:00am", online:true},
    {img:"./user.jpg", name:"Abd_el_wahhab Ali", lastSeen:"Today at 3:00am", online:false},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
    {img:"./user.jpg", name:"Mohamed waleed", lastSeen:"Today at 1:00am", online:true},
  ];

  return (
    <div className='hidden xl:block bg-white w-[300px] h-[calc(100vh-60px)] fixed right-0 py-4 px-3 overflow-y-scroll border-l'>

      <p className="font-semibold text-gray-600 text-lg px-1 mb-2">Friends</p>

      {data?.users.map((friend, index) => {

        const userName = `${friend.personalInfo.firstName} ${friend.personalInfo.lastName}`
      
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              to={`/user/${(userName.replaceAll(' ', '_')).replaceAll('-','_')}-${friend._id}`}
              className='flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-blue-100 transition-all duration-200 group cursor-pointer'
            >
          
              <div className='relative'>
                <img 
                  src={`./user.jpg`} 
                  className='h-[45px] w-[45px] rounded-full object-cover'
                />

                {/* online dot */}
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white 
                  ${friend.online ? "bg-green-500" : "bg-gray-400"}`}>
                </span>
              </div>

              <div className="flex flex-col  justify-center leading-tight">
                <p className='font-semibold text-[15px] group-hover:text-blue-600'>{userName}</p>
                <p className='text-xs text-gray-500 group-hover:text-blue-400'>
                  last seen:  
                </p>
              </div>

            </Link>
          </motion.div>
        )}
      )}

    </div>
  );
}
