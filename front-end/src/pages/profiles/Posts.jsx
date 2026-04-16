import React from 'react'

// components
import Post from "../../components/post/Post.jsx"
import LoadMoreBtn from "../../components/btns/LoadMore.jsx"

import { useGetMethod } from "../../hooks/useGetMethod.js";



export default function Posts({userId}) {
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
    <div >
      {loading_g ? (
        <div>Loading...</div>
      ) : (
        <div className='space-y-2'>
            {posts?.map((post) => (
                <Post data={post} canEdit={true} key={post._id}/>
            ))}
        </div>
      )}

      {data_g?.posts?.length > 0 && (
        <LoadMoreBtn
          loading={loading_g}
          loadMore={() => setQuery({...query, page: query.page + 1})}
          text="Load More"
        />
      )}
    </div>
  )
}

