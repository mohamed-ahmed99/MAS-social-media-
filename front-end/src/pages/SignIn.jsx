import { useEffect, useState } from 'react';
import Input from '../components/Input'
import {motion} from 'framer-motion'
import {useMyStore} from '../hooks/useMyStore'
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom';
import {PuffLoader } from 'react-spinners'
import { useUserContext } from '../hooks/useUserContext';


const SignIn = () => {

    // hooks
    const {store, setStore} = useMyStore()
    const {userData, setUserData} = useUserContext() 

    const navigate = useNavigate()

    // states
    const [data, setData] = useState({email:"", password:""})
    const [validation, setValidation] = useState({email:"", password:""})
    const [serverMSG, setServerMSG] = useState({})
    const [loading, setLoading] = useState(false)

    // submition
    const submition = async (e) => {
        e.preventDefault();
        let errors = {}

        // check email
        if (!data.email) errors.email ="Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email address"
        else errors.email = ""

        // check password
        if (!data.password) errors.password = "Password is required"
        else if(data.password.length < 6) errors.password = "short password"
        else errors.password = ""

        setValidation(errors) // validation messages


        const callBack = async () => {
            setLoading(true)
            try{
                // http://localhost:5150/api/auth/signin
                // https://masproback.vercel.app/api/auth/signin
                const res = await fetch("http://localhost:5150/api/auth/signin", {
                    method:"POST",
                    headers:{"content-type":"application/json"},
                    credentials:"include",
                    body:JSON.stringify(data)
                })

                const serverRes = await res.json()

                if(!res.ok){
                    setServerMSG(
                        {message: serverRes.message || Object.values(serverRes.validators)[0], key:Math.random()}
                    )
                    if(serverRes.order === "verifyEmail") navigate('/verify-email')
                    return
                }
                
                localStorage.setItem("MASproAuth", serverRes.token)
                serverRes.user.token = ""
                setUserData(serverRes.user)
                navigate('/profile')
            }
            catch(error){
                setServerMSG({message:error.message, key:Math.random()})
                return {message: error.message}
            }
            finally{
                setLoading(false)
            }
        } 
        if(! Object.values(errors).some(v => v != "")){
            await callBack()
        }
        
    }


        
    return (
        <div className='bg-gray-100 min-h-screen  flex items-center justify-center p-4'>
            {loading && <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10'>
                <PuffLoader color="#000" size={100}/>
            </div>}

            {serverMSG && <Alert message={serverMSG.message} alertKey={serverMSG.key}/>} 

            {store.serverMessage && <Alert message={store.serverMessage} alertKey={Math.random()}/>}

            <motion.div initial={{scale:.1}} animate={{scale:1}} transition={{duration:.3, type:"spring", stiffness:100}}
                    className='bg-white w-full max-w-[600px] p-6 space-y-6 shadow-xl rounded-2xl'>

                <h2 className='text-center text-[25px] capitalize'>Sign In</h2>
                
                <form onSubmit={submition} className='space-y-4'>
                    
                    <Input placeholder="Email" name="email" validation={validation} onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    <Input placeholder="password" name="password" validation={validation} type='password' onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    
                    <button type='submit' disabled={loading} 
                        className='bg-black text-white w-full p-3 rounded-md font-semibold 
                        hover:opacity-80 cursor-pointer'>Sign Up</button>

                </form>

            </motion.div>
            
        </div>
    );
}

export default SignIn;
