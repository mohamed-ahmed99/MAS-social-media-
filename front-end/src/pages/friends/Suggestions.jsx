import React, { useEffect, useState } from 'react'
import FriendCards from './FriendCard'
import {useGetFromServer} from '../../hooks/getFromServer.js'
import SeeMoreBtn from '../../components/SeeMoreBtn.jsx'
import FriendCardLoading from './FriendCardLoading.jsx'

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
            return <FriendCards key={index} userData={user} blueBtn="add friend"/>
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
    </div>
  )
}
