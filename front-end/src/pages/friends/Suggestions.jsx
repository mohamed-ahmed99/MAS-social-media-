import { useEffect, useState } from 'react'
import FriendCards from './FriendCard'
import {useGetFromServer} from '../../hooks/getFromServer.js'
import SeeMoreBtn from '../../components/SeeMoreBtn.jsx'
import FriendCardLoading from './FriendCardLoading.jsx'
import UI_Message from '../../components/UI_Message.jsx'
import { FaUserAltSlash } from "react-icons/fa";

export default function Suggestions() {

  const token = localStorage.getItem("MASproAuth")
  const [query, setQuery] = useState({limit:20, page:1})

  // http://localhost:5150/api/users/get?limit=${query.limit}&page=${query.page}
  // https://masproback.vercel.app/api/users/get?limit=${query.limit}&page=${query.page}
  const url = `https://masproback.vercel.app/api/users/get?limit=${query.limit}&page=${query.page}`

  const {status, message, data, loading} = useGetFromServer(url, {headers:{authorization:`Bearer ${token}`}})
  
  const [allFriends, setAllFriends] = useState([])

  useEffect(() => {
    if(data?.users){
      setAllFriends(prev => query.page === 1 ? data.users : [...prev, ...data.users]);
    }
  },[data])


  return (

    <div className='space-y-4 pb-4'>
      <div className='grid grid-cols-3 lmd:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 lmd:gap-4 px-3 lmd:pr-5 lmd:pl-1 '>
          {allFriends.map((user, index) => {
            console.log('useeeeeeeeeeeeeeeeeeeeeeeeer',user)
            return <FriendCards key={index} userData={user} blueBtn="add friend" grayBtn=''/>
          })} 
      </div>
      
      {loading && query.page === 1 &&
        <div className='grid grid-cols-3 lmd:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 lmd:gap-4 px-3 lmd:pr-5 lmd:pl-1 '>
          {Array(20).fill(0).map((_, index) => (<FriendCardLoading key={index}/>))}
        </div>
      }

      <div className=' w-full '>

          {/* SEE MORE BUTTON (after first load) */}
          {!loading && data && data?.users?.length >= query.limit && (
              <SeeMoreBtn setQuery={setQuery} loading={loading} />
          )}
          
          {loading && query.page > 1 && (
              <SeeMoreBtn setQuery={setQuery} loading={loading} />
          )}
      </div>



      {/* if there is no data */}
      {allFriends.length == 0  &&
        <div className='flex items-center justify-center'>
          <div className='flex items-center justify-center h-[calc(100vh-30vh)] '>
                          <UI_Message 
                              iconColor="text-gray-500" 
                              icon={<FaUserAltSlash size={window.innerWidth >= 480 ? 200 : 150}/>} 
                              text={`You have no friend requests yet.`}  
                          />
                        </div>
        </div>
      }
    </div>
  )
}
