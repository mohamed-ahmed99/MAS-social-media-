import React from 'react';
import { Link } from 'react-router-dom';
import { useMyStore } from '../../hooks/useMyStore';
import { useUserContext } from '../../hooks/useUserContext';
import { memo } from 'react';

export default memo( function Home () {

    const {store, setStore} = useMyStore()
    const {userData, setUserData} = useUserContext() 

    return(
        <div className='flex justify-center w-full h-[1000px] '>
            <div className='w-[600px] bg-slate-600'>
                dddddddddddddddd
            </div>
        </div>
    )
})