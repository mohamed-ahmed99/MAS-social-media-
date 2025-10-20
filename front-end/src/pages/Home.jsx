import React from 'react';
import { Link } from 'react-router-dom';
import { useMyStore } from '../hooks/useMyStore';

export default function Home () {

    const {store, setStore} = useMyStore()

    return(
        <div>
            <ul className='space-x-4'>
                <Link to={'/signup'}>Go To Sign UP</Link>
                <Link to={'/signin'}>Go To Sign In</Link>
                <Link to={'/verify-email'}>Go To Verify_Email</Link>
            </ul>

            <pre>{JSON.stringify(store.user, null, 2)}</pre>
        </div>
    )
}