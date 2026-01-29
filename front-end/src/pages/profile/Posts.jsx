import {useState, useEffect} from 'react'
import Post from '../../components/post/Post.jsx';
import { useGetFromServer } from '../../hooks/getFromServer.js';
import { useUserContext } from '../../hooks/useUserContext.jsx';
import SeeMoreBtn from '../../components/SeeMoreBtn.jsx';
import {PuffLoader} from "react-spinners"
import EndOfPosts from '../../components/post/EndOfPosts.jsx';
import LastPostInProfiles from '../../components/post/LastPostInProfiles.jsx';
import PostLoading from '../../components/post/PostLoading.jsx';

export default function Posts() {

  const {userData, setUserData} = useUserContext();

  


  // http://localhost:5150/api/posts/get/user?limit=${query.limit}&page=${query.page}&userId=${userData?.user?._id}
  // https://masproback.vercel.app/api/posts/get/user?limit=${query.limit}&page=${query.page}&userId=${userData?.user?._id}
  const [query, setQuery] = useState({limit: 10, page: 1,});

  // user id
  const userId = userData?.user?._id;
  const url = userId ? 
  `https://masproback.vercel.app/api/posts/get/user?limit=${query.limit}&page=${query.page}&userId=${userData?.user?._id}` : null;

  // get posts data
  const {status, message, data, loading} = 
    useGetFromServer(url,{headers:{"Authorization": `Bearer ${localStorage.getItem("MASproAuth")}`}}, [query, userData]);


  const [allPosts, setAllPosts] = useState([])
  useEffect(() => {
      if(data?.posts && data?.posts?.length > 0){
          setAllPosts(prev => query.page === 1 ? data.posts : [...prev, ...data.posts]);
      }
  },[data])

  
  

  return (
    <div className='col-span-10 lg:col-span-6 space-y-1 mt-2'>


      {allPosts && allPosts.length > 0 &&
        allPosts.map((post) => (
          <Post key={post._id} data={post} profile={true} />
        ))
      }

      {
        loading && (
          <div className='space-y-2'>
            <PostLoading />
            <PostLoading />
          </div>
        )
      }      

      {/* NO MORE POSTS */}
      {!loading && data?.posts && data?.posts.length < query.limit && (
          <LastPostInProfiles text={`You joined us at `}/>
      )}


      {!loading && data?.posts && data?.posts.length >= query.limit &&  (
        <SeeMoreBtn setQuery={setQuery} loading={loading} />
      )}


      {loading && query.page > 1 && (
        <SeeMoreBtn setQuery={setQuery} loading={loading} />
      )}


    </div>
  )
}
