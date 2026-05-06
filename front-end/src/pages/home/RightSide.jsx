import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import FriendCardLoading from "./FriendCardLoading";
import { useGetMethod } from '../../hooks/useGetMethod'
import CircularImage from "../../components/CircularImage";
import GeneralBtn from "../../components/btns/GeneralBtn.jsx";

export default function RightSide() {
  const {getData, data_g, loading_g} = useGetMethod()

  const [query, setQuery] = useState({limit:10, page:1})
  const [allFriends, setAllFriends] = useState([])

  // get friends
  useEffect(() => {
    getData(`/api/relationship/get-friends?limit=${query.limit}&page=${query.page}`)
  },[query])

  // setting data
  useEffect(() => {
    if(data_g?.users){
      setAllFriends(prev => query.page === 1 ? data_g.users : [...prev, ...data_g.users]);
    }
  },[data_g])


  return (
    <div className='hidden xl:block bg-white w-[300px] h-[calc(100vh-60px)] fixed right-0 py-4 px-3 overflow-y-scroll border-l'>

      <p className="font-semibold text-gray-600 text-lg px-1 mb-2">Friends</p>

      {allFriends.map((friend, index) => {
        const userName = `${friend?.firstName} ${friend?.lastName}`
      
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              to={`/user/${(userName.replaceAll(' ', '_')).replaceAll('-','_')}-${friend._id}`}
              className='flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-black/80 hover:text-white transition-all duration-200 group cursor-pointer'
            >
          
              {/* Profile image */}
              <div className='relative h-[45px] w-[45px]'>
                <CircularImage 
                  src={friend.profilePicture}
                  firstName={friend.firstName}
                  className="rounded-full"
                />

                {/* online dot */}
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white 
                  ${friend.online ? "bg-green-500" : "bg-gray-400"}`}>
                </span>
              </div>

              <div className="flex flex-col  justify-center leading-tight">
                <p className='font-semibold text-[15px] group-hover:text-white transition-all duration-200'>
                  {userName}
                </p>
                <p className='text-xs text-gray-500 group-hover:text-white transition-all duration-200'>
                  last seen:  
                </p>
              </div>

            </Link>
          </motion.div>
        )}
      )}
      

      {/* loading */}
      {loading_g && (
        <div className="space-y-2">
          {Array(5).fill(0).map((_, index) => (<FriendCardLoading key={index}/>))}
        </div>
      )}

      <div className="w-full mt-4">
        {!loading_g && data_g && data_g?.users?.length == query.limit  && (
            // <SeeMoreBtn setQuery={setQuery} loading={loading_g} />
            <GeneralBtn
              variant="secondary"
              text="See More"
              onClick={() => setQuery(prev => ({...prev, page: prev.page + 1}))}
              loading={loading_g}
              className="w-full py-2 shadow-none "
            />
        )}
      </div>


      {/* if user has no frineds */}
      {allFriends.length === 0 && !loading_g && (
        <div className="flex items-center justify-center h-[calc(100vh-30vh)] ">
            <p className="text-gray-600">No friends found</p>
        </div>
      )}

      {data_g?.users?.length < query.limit && query.page >= 1 && !loading_g && (
        <div className="flex items-center justify-center  ">
            <p className="text-gray-600">There are no more friends to show.</p>
        </div>
      )}

    </div>
  );
}
