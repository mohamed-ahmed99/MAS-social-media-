import { useEffect, useState } from 'react'
import FriendCards from './friendCard/FriendCard.jsx'
import {useGetFromServer} from '../../hooks/getFromServer.js'
import SeeMoreBtn from '../../components/SeeMoreBtn.jsx'
import FriendCardLoading from './FriendCardLoading.jsx'
import UI_Message from '../../components/UI_Message.jsx'
import { FaUserAltSlash } from "react-icons/fa";
import { useGetMethod } from '../../hooks/useGetMethod.js'


export default function Friends() {

    const {getData, status_g, message_g, data_g, loading_g} = useGetMethod()
    const [query, setQuery] = useState({limit:20, page:1})

    // end point for get all friends
    const endPoint = `/api/relationship/get-friends?limit=${query.limit}&page=${query.page}`
  
    const [allFriends, setAllFriends] = useState([])

    // getting all friends
    useEffect(() => {
      getData(endPoint)
    },[query])

    // setting data
    useEffect(() => {
      if(data_g?.users){
        setAllFriends(prev => query.page === 1 ? data_g.users : [...prev, ...data_g.users]);
      }
    },[data_g])







  return (
    <div>
      <div className='space-y-4 pb-4'>
        <div className='grid grid-cols-3 lmd:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 lmd:gap-4 px-3 lmd:pr-5 lmd:pl-1 '>
            {allFriends.map((user, index) => {
              console.log('user', user)
              return <FriendCards key={index} userData={user} blackBtn="MESSAGE" grayBtn='REMOVE'/>
            })} 
        </div>
            
        {loading_g && query.page === 1 &&
          <div className='grid grid-cols-3 lmd:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 lmd:gap-4 px-3 lmd:pr-5 lmd:pl-1 '>
            {Array(20).fill(0).map((_, index) => (<FriendCardLoading key={index}/>))}
          </div>
        }
      
        <div className="w-full">
            {/* SEE MORE BUTTON (after first load) */}
            {!loading_g && data_g && data_g?.users?.length >= query.limit && (
                <SeeMoreBtn setQuery={setQuery} loading={loading_g} />
            )}
                
            {loading_g && query.page > 1 && (
                <SeeMoreBtn setQuery={setQuery} loading={loading_g} />
            )}
        </div>
      </div>


            
      {/* if there is no data */}
      {allFriends.length == 0  &&
        <div className='flex items-center justify-center h-[calc(100vh-30vh)] '>
          <UI_Message 
            iconColor="text-gray-500" 
            icon={<FaUserAltSlash size={window.innerWidth >= 480 ? 200 : 150}/>} 
            text={`You have no friends yet.`}  
          />
        </div>
      }

    </div>
  )
}
