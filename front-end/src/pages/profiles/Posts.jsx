import React from 'react'

// components
import Post from "../../components/post/Post.jsx"
import GeneralBtn from '../../components/btns/GeneralBtn.jsx';
import { PuffLoader } from 'react-spinners';
import SystemPost from '../../components/post/SystemPost.jsx';
import NoPostsYet from './NoPostsYet.jsx';

import { useGetMethod } from "../../hooks/useGetMethod.js";



export default function Posts({userId, joinDate, setCreatePost}) {
    const { getData, status_g, message_g, data_g, loading_g, action_g } = useGetMethod()
    const [query, setQuery] = React.useState({limit: 20, page: 1})

    const [posts, setPosts] = React.useState([])

    

    // get user posts
    React.useEffect(() => {
        if (userId) {
            getData(`/api/posts/get/user/${userId}?limit=${query.limit}&page=${query.page}`)
        }else{
            console.log("no user id")
        }
    }, [query.page, query.limit, userId])

    // set posts
    React.useEffect(() => {
        if (data_g?.posts) {
            setPosts((prevPosts) => [...prevPosts, ...data_g.posts])
        }
    }, [data_g?.posts])

    console.log('posts', { status_g, message_g, data_g, loading_g, action_g })
  return (
    <div className='space-y-2'>
      {loading_g ? (
        <div>Loading...</div>
      ) : (
        <div className='space-y-1 lg:space-y-2'>
            {posts?.map((post) => (
                <Post data={post} canEdit={true} key={post._id}/>
            ))}
        </div>
      )}


      {/* no posts yet */}
      {!loading_g && data_g?.posts?.length === 0 && query.page === 1 && (
        <NoPostsYet edit={true} setCreatePost={setCreatePost}/>
      )}


      {/* postes ended */}
      {!loading_g && data_g?.posts?.length > 0 && 
        query.page > 1 &&
        data_g?.posts?.length < query.limit && (
        <SystemPost 
          text={`you joined on ${new Date(joinDate).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"})}`}
        />
      )}

      {/* load more posts */}
      {data_g?.posts?.length > 0 && !loading_g && data_g?.posts?.length === query.limit && (
        <div className='px-4'>
          <GeneralBtn
            text="Load More"
            loading={loading_g}
            onClick={() => setQuery({...query, page: query.page + 1})}
            className=""
            variant="primary"
            type="button"
            loadingIcon={<PuffLoader color="#ffffff" size={22} />}
          />
        </div>
      )}
    </div>
  )
}

