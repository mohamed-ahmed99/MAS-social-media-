import React from 'react';
import { Link } from 'react-router-dom';
import { useMyStore } from '../../hooks/useMyStore';
import { useUserContext } from '../../hooks/useUserContext';
import { memo } from 'react';
import CreatePostBox from './CreatePostBox';

export default memo( function Home () {

    const {store, setStore} = useMyStore()
    const {userData, setUserData} = useUserContext() 

    return(
        <div className='flex justify-center w-full h-[1000px] '>
            <div className='w-[600px] py-4'>

                <CreatePostBox/>
                
            </div>
        </div>
    )
})