import React from 'react';
import { Link } from 'react-router-dom';

export default function Home () {

    return(
        <div>
            <Link to={'/signup'}>Go To Sign UP</Link>
        </div>
    )
}