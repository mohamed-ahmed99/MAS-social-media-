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

export default memo( function Home () {

    const {userData, setUserData} = useUserContext() 
    const [query, setQuery] = useState({limit:5, page:1})
    console.log("home rendered", query)

    const [createPost, setCreatePost] = useState(false)

    // http://localhost:5150/api/posts/get?limit=${query.limit}&page=${query.page}
    // https://masproback.vercel.app/api/posts/get?limit=${query.limit}&page=${query.page}
    const url = `https://masproback.vercel.app/api/posts/get?limit=${query.limit}&page=${query.page}`
    const token = localStorage.getItem("MASproAuth")
    const {status, message, data, loading} = useGetFromServer(url, {headers:{authorization:`Bearer ${token}`}})
    const [allPosts, setAllPosts] = useState([])
    useEffect(() => {
        if(data?.posts && data?.posts?.length > 0){
            setAllPosts(prev => query.page === 1 ? data.posts : [...prev, ...data.posts]);
        }
    },[data])
    


    return(
        <div className='flex justify-center md:justify-end xl:justify-center w-full  '>
            <div className='w-full md:w-[calc(100vw-250px)] lg:w-[calc(100vw-300px)] xl:w-[calc(100vw-620px)] 2xl:w-[calc(100vw-650px)] py-2 md:py-3 md:px-2 space-y-2 md:space-y-3'>

                <CreatePostBox setCreatePost={setCreatePost}/>
                {createPost && <CreatePostAlert setCreatePost={setCreatePost}/>}

                <div className='flex flex-col gap-1 lg:gap-2 bg-gray-200'>
                    {/* <Post img={"./cover.jpg"} /> */}
                    {allPosts.map((post, index) => (
                        <Post key={index} data={post} />
                    ))}
                </div>

                {/* FIRST LOAD LOADING */}
                {loading && query.page === 1 && (
                <div className='absolute inset-0 flex items-center justify-center mt-4'>
                    <PuffLoader size={200} color="#000" />
                </div>
                )}

                {/* NO MORE POSTS */}
                {!loading && data?.posts && data?.posts?.length < query.limit && (
                    <EndOfPosts text={End_Of_Posts_Message.noPosts}/>
                )}

                {/* SEE MORE BUTTON (after first load) */}
                {!loading && data && data?.posts?.length >= query.limit && (
                    <SeeMoreBtn setQuery={setQuery} loading={loading} />
                )}

                {loading && query.page > 1 && (
                    <SeeMoreBtn setQuery={setQuery} loading={loading} />
                )}

            </div>
        </div>
    )
})