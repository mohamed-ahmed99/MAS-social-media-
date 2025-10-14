import { useEffect, useState } from 'react';
import Input from '../components/Input'
import {motion} from 'framer-motion'
import {useMyStore} from '../hooks/useMyStore'
import Alert from '../components/Alert'


const SignIn = () => {

    const {store, setStore} = useMyStore()

    const [data, setData] = useState({email:"", password:""})
    const [validation, setValidation] = useState({email:"", password:""})

        const submition = async (e) => {
        e.preventDefault();
        console.log(store)

        // check email
        if (!data.email) setValidation(prev => ({ ...prev, email: "Email is required" }));
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) setValidation(prev => ({ ...prev, email: "Invalid email address" }));
        else setValidation(prev => ({...prev, email:""}))

        // check password
        if (!data.password) setValidation(prev => ({ ...prev, password: "Password is required" }));
        else if(data.password.length < 6) setValidation(prev => ({ ...prev, password: "short password" }));
        else setValidation(prev => ({...prev, password:""}))
    }


        
    return (
        <div className='bg-gray-100 min-h-screen  flex items-center justify-center p-4'>

            <Alert message={store.serverMessage && store.serverMessage}/>

            <motion.div initial={{scale:.1}} animate={{scale:1}} transition={{duration:.3, type:"spring", stiffness:100}}
                    className='bg-white w-full max-w-[600px] p-6 space-y-6 shadow-xl rounded-2xl'>

                <h2 className='text-center text-[25px] capitalize'>Sign In</h2>
                
                <form onSubmit={submition} className='space-y-4'>
                    
                    <Input placeholder="Email" name="email" validation={validation} onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    <Input placeholder="password" name="password" validation={validation} type='password' onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    
                    <button type='submit' 
                        className='bg-black text-white w-full p-3 rounded-md font-semibold 
                        hover:opacity-80 cursor-pointer'>Sign Up</button>

                </form>

            </motion.div>
            
        </div>
    );
}

export default SignIn;
