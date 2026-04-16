import { Link } from 'react-router-dom';
import { useMyStore } from '../../hooks/useMyStore';
import { useUserContext } from '../../hooks/useUserContext';
import { memo } from 'react';
import CreatePostBox from './CreatePostBox';
import Post from '../../components/post/Post.jsx';
import CreatePostAlert from '../../components/createPostAlert/CreatePostAlert.jsx';
import { useState } from 'react';
import {useGetFromServer} from '../../hooks/getFromServer.js'
import SeeMoreBtn from '../../components/SeeMoreBtn.jsx';
import {PuffLoader } from 'react-spinners'
import { useEffect } from 'react';
import EndOfPosts from '../../components/post/EndOfPosts.jsx';
import { End_Of_Posts_Message } from '../../messages'
import PostLoading from '../../components/post/PostLoading.jsx';
import { useGetMethod } from '../../hooks/useGetMethod.js';
import SystemPost from '../../components/post/SystemPost.jsx';
import {FaRegFaceSadTear} from 'react-icons/fa6'

export default memo( function Home () {

    // hook to get data from server
    const {getData, status_g, message_g, data_g, loading_g, action_g} = useGetMethod()

    // states
    const [query, setQuery] = useState({limit:10, page:1}) // limit and page for pagination
    const [createPost, setCreatePost] = useState(false) // to open create post modal
    const [allPosts, setAllPosts] = useState([]) // all posts
    

    // get posts
    useEffect(() => {
        // end point for get all posts
        const endPoint = `/api/posts/get?limit=${query.limit}&page=${query.page}`
        getData(endPoint)
    },[query.page])
            
    // handle posts data
    useEffect(() => {
        if(data_g?.posts && data_g?.posts?.length > 0){
            setAllPosts(prev => query.page === 1 ? data_g.posts : [...prev, ...data_g.posts]);
        }
    },[data_g])
    
    console.log(allPosts)


    return(
        <div className='flex justify-center md:justify-end xl:justify-center w-full  '>
            <div className='w-full md:w-[calc(100vw-250px)] lg:w-[calc(100vw-300px)] xl:w-[calc(100vw-620px)] 2xl:w-[calc(100vw-650px)] py-2 md:py-3 md:px-2 space-y-2 md:space-y-3'>

                <CreatePostBox setCreatePost={setCreatePost}/>
                {createPost && <CreatePostAlert setCreatePost={setCreatePost}/>}

                <div className='flex flex-col gap-1 lg:gap-2 bg-gray-200'>
                    {/* <Post img={"./cover.jpg"} /> */}
                    {allPosts.map((post, index) => (
                        <Post 
                            key={index} 
                            data={post} 
                        />
                    ))}
                </div>

                {/* FIRST LOAD LOADING */}
                {loading_g && query.page === 1 && (
                <div className='space-y-2 mt-2'>
                    <PostLoading />
                    <PostLoading />
                    <PostLoading />
                    <PostLoading />
                    <PostLoading />
                </div>
                )}

                {/* NO MORE POSTS */}
                {!loading_g && data_g?.posts && data_g?.posts?.length < query.limit && (
                    <SystemPost 
                        text={End_Of_Posts_Message.noPosts} 
                        icon={<FaRegFaceSadTear size={24} className='text-gray-400'/>}
                    />
                )}

                {/* SEE MORE BUTTON (after first load) */}
                {!loading_g && data_g && data_g?.posts?.length >= query.limit && (
                    <SeeMoreBtn setQuery={setQuery} loading={loading_g} />
                )}

                {loading_g && query.page > 1 && (
                    <SeeMoreBtn setQuery={setQuery} loading={loading_g} />
                )}

            </div>
        </div>
    )
})