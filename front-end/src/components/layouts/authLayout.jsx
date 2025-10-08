import React from 'react';
import NavAuth from '../NavAuth'
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div>
            <NavAuth/>

            <main>
                <Outlet/>
            </main>
            
        </div>
    );
}

export default AuthLayout;
