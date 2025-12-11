import React from 'react';
import { Link } from 'react-router-dom';
import { useMyStore } from '../../hooks/useMyStore';
import { useUserContext } from '../../hooks/useUserContext';
import { memo } from 'react';
import CreatePostBox from './CreatePostBox';
import Post from '../../components/Post';

export default memo( function Home () {

    const {store, setStore} = useMyStore()
    const {userData, setUserData} = useUserContext() 

    return(
        <div className=' flex justify-center md:justify-end xl:justify-center w-full  '>
            <div className='w-full md:w-[calc(100vw-250px)] lg:w-[calc(100vw-300px)] xl:w-[calc(100vw-620px)] 2xl:w-[calc(100vw-650px)] py-2 md:py-3 md:px-2 space-y-2 md:space-y-3'>

                <CreatePostBox/>

                <div className='flex flex-col gap-1 lg:gap-2 bg-gray-200'>
                     <Post/>
                    <Post img={"./user.jpg"}/>
                    <Post img={"./user.jpg"}/>
                    <Post img={"./user.jpg"}/>
                     <Post/>
                     <Post/>
                    <Post img={"./user.jpg"}/>
                     <Post/>
                    <Post/>

                </div>

                
            </div>
        </div>
    )
})