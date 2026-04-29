import { useEffect, useState } from 'react'
import FriendCards from './friendCard/FriendCard.jsx'
import { useGetMethod } from '../../hooks/useGetMethod.js'
import SeeMoreBtn from '../../components/SeeMoreBtn.jsx'
import FriendCardLoading from './FriendCardLoading.jsx'
import UI_Message from '../../components/UI_Message.jsx'
import { FaUserAltSlash } from "react-icons/fa";


export default function Suggestions() {

  // set queries
  const [query, setQuery] = useState({ limit: 20, page: 1 })

  const { getData, status_g, message_g, data_g, loading_g } = useGetMethod()
  const [allFriends, setAllFriends] = useState([])

  // get limited users
  useEffect(() => {
    const getUsers = async () => {
      const endPoint = `/api/relationship/suggest-friends?limit=${query.limit}&page=${query.page}`
      await getData(endPoint)
    }
    getUsers()
  }, [query.page, query.limit])

  // handle response
  useEffect(() => {
    if (data_g?.users) {
      setAllFriends(prev => query.page === 1 ? data_g.users : [...prev, ...data_g.users]);
    }
  }, [data_g])


  console.log('all', allFriends)
  // XML
  return (

    <div className='space-y-4 pb-4'>

      {/* users cards */}
      <div className='grid grid-cols-3 lmd:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 lmd:gap-4 px-3 lmd:pr-5 lmd:pl-1 '>
        {allFriends.map((user) => {
          return <FriendCards key={user._id} userData={user} blackBtn="ADD_FRIEND" grayBtn='' />
        })}
      </div>

      {loading_g && query.page === 1 &&
        <div className='grid grid-cols-3 lmd:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 lmd:gap-4 px-3 lmd:pr-5 lmd:pl-1 '>
          {Array(query.limit).fill(0).map((_, index) => (<FriendCardLoading key={index} />))}
        </div>
      }

      <div className=' w-full '>

        {/* SEE MORE BUTTON (after first load) */}
        {!loading_g && data_g && data_g?.users?.length >= query.limit && (
          <SeeMoreBtn setQuery={setQuery} loading={loading_g} />
        )}

        {loading_g && query.page > 1 && (
          <SeeMoreBtn setQuery={setQuery} loading={loading_g} />
        )}
      </div>



      {/* if there is no data */}
      {allFriends.length == 0 && !loading_g &&
        <div className='flex items-center justify-center'>
          <div className='flex items-center justify-center h-[calc(100vh-30vh)] '>
            <UI_Message
              iconColor="text-gray-500"
              icon={<FaUserAltSlash size={window.innerWidth >= 480 ? 200 : 150} />}
              text={`No suggestions yet.`}
            />
          </div>
        </div>
      }
    </div>
  )
}
