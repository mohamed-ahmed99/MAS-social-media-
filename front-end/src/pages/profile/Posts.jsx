import {useState, useEffect} from 'react'
import Post from '../../components/post/Post.jsx';
import { useGetFromServer } from '../../hooks/getFromServer.js';
import { useUserContext } from '../../hooks/useUserContext.jsx';
import SeeMoreBtn from '../../components/SeeMoreBtn.jsx';
import {PuffLoader} from "react-spinners"

export default function Posts() {

  const {userData, setUserData} = useUserContext();
  console.log("userData in profile posts:", userData);


  // http://localhost:5150/api/posts/get/user?limit=${query.limit}&page=${query.page}&userId=${userData?.user?._id}
  // https://masproback.vercel.app/api/posts/get/user?limit=${query.limit}&page=${query.page}&userId=${userData?.user?._id}
  const [query, setQuery] = useState({limit: 1, page: 1,});

  const userId = userData?.user?._id;

  const url = userId ? 
  `https://masproback.vercel.app/api/posts/get/user?limit=${query.limit}&page=${query.page}&userId=${userData?.user?._id}` : null;

  const {status, message, data, loading} = useGetFromServer(url,{headers:{"Authorization": `Bearer ${localStorage.getItem("MASproAuth")}`}}, [query, userData]);
  console.log("Posts data in profile posts:", data);

  const [allPosts, setAllPosts] = useState(data || [])
  useEffect(() => {
      if(data && data.length > 0){
          setAllPosts(prev => query.page === 1 ? data : [...prev, ...data]);
      }
  },[data])

  return (
    <div className='col-span-10 lg:col-span-6 space-y-1 mt-2'>

      {loading && query.page === 1 && (
        <div className='flex items-center justify-center mt-4'>
            <PuffLoader size={200} color="#000" />
        </div>
      )}

      {allPosts && allPosts.length > 0 &&
        allPosts.map((post) => (
          <Post key={post._id} data={post} profile={true} />
        ))
      }
      <Post img={'/cover.jpg'} profile={true} />


      {!loading && (
        <SeeMoreBtn setQuery={setQuery} loading={loading} />
      )}


      {loading && query.page >= 1 && (
        <SeeMoreBtn setQuery={setQuery} loading={loading} />
      )}


    </div>
  )
}
