import React from 'react';
import { Link } from 'react-router-dom';
import { useMyStore } from '../hooks/useMyStore';

export default function Home () {

    const {store, setStore} = useMyStore()

    return(
        <div>
            <Link to={'/signup'}>Go To Sign UP</Link>
            <p>{JSON.stringify(store.user)}</p>
        </div>
    )
}