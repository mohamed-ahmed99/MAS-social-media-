import React from 'react'

// components
import Post from "../../components/post/Post.jsx"

import { useGetMethod } from "../../hooks/useGetMethod.js";



export default function Posts({userId}) {
    const { getData, status_g, message_g, data_g, loading_g, action_g } = useGetMethod()
    const [query, setQuery] = React.useState({limit: 10, page: 1})

    // get user posts
    React.useEffect(() => {
        if (userId) {
            getData(`/api/posts/get/user/${userId}?limit=${query.limit}&page=${query.page}`)
        }
    }, [query.page, query.limit, userId])

    console.log('posts', { status_g, message_g, data_g, loading_g, action_g })
  return (
    <div>
      {loading_g ? (
        <div>Loading...</div>
      ) : (
        data_g?.posts?.map((post) => (
          <div key={post._id} className="bg-white lg:rounded-xl shadow-sm overflow-hidden border border-gray-100/50">
             <Post data={post} canEdit={true}/>
          </div>
        ))
      )}
    </div>
  )
}



// {posts && posts.length > 0 ? (
//               posts.map((post) => (
//                 <div key={post._id} className="bg-white lg:rounded-xl shadow-sm overflow-hidden border border-gray-100/50">
//                    <Post data={post} />
//                 </div>
//               ))
//             ) : ( 
//               <NoPostsYet 
//                 edit={edit} 
//                 setCreatePost={setCreatePost} 
//               />
//             )}