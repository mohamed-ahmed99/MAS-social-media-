import { Link } from 'react-router-dom';
import { useMyStore } from '../../hooks/useMyStore';
import { useUserContext } from '../../hooks/useUserContext';
import { memo } from 'react';
import CreatePostBox from './CreatePostBox';
import Post from '../../components/post/Post.jsx';
import CreatePostAlert from '../../components/createPostAlert/CreatePostAlert.jsx';
import { useState } from 'react';
import {getFromServer} from '../../hooks/getFromServer.js'
import SeeMoreBtn from './SeeMoreBtn.jsx';

export default memo( function Home () {

    const {userData, setUserData} = useUserContext() 
    const [query, setQuery] = useState({limit:20, page:1})
    console.log("home rendered", query)

    const [createPost, setCreatePost] = useState(false)
    // const {status, message, data, loading} = getFromServer()

    return(
        <div className='flex justify-center md:justify-end xl:justify-center w-full  '>
            <div className='w-full md:w-[calc(100vw-250px)] lg:w-[calc(100vw-300px)] xl:w-[calc(100vw-620px)] 2xl:w-[calc(100vw-650px)] py-2 md:py-3 md:px-2 space-y-2 md:space-y-3'>

                <CreatePostBox setCreatePost={setCreatePost}/>
                {createPost && <CreatePostAlert setCreatePost={setCreatePost}/>}

                <div className='flex flex-col gap-1 lg:gap-2 bg-gray-200'>
                    <Post/>
                    <Post img={"./cover.jpg"}/>
                     <Post/>
                    <Post img={"./cover.jpg"}/>
                     <Post/>
                    <Post img={"./cover.jpg"}/>
                     <Post/>
                    <Post img={"./cover.jpg"}/>
                    <Post/>

                </div>

                <SeeMoreBtn setQuery={setQuery}/>

                
            </div>
        </div>
    )
})