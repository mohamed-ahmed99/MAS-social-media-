import React from 'react';
import { Link } from 'react-router-dom';
import { useMyStore } from '../hooks/useMyStore';
import { useUserContext } from '../hooks/useUserContext';

export default function Home () {

    const {store, setStore} = useMyStore()
    const {userData, setUserData} = useUserContext() 
    console.log(userData)

    return(
        <div className='h-[300vh]'>
            <ul className='space-x-4'>
                <Link to={'/signup'}>Go To Sign UP</Link>
                <Link to={'/signin'}>Go To Sign In</Link>
                <Link to={'/verify-email'}>Go To Verify_Email</Link>
                <Link to={'/profile'}>Go To profile</Link>
            </ul>

            <pre>{JSON.stringify(store.user, null, 2)}</pre>
        </div>
    )
}