import { useEffect, useState } from 'react';
import Input from '../components/Input'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import {useMyStore} from '../hooks/useMyStore'

const SignUp = () => {

    // data I want from user
    const [data, setData] = useState(
        {firstName:"", lastName:"", email:"", phoneNumber:"", password:"", confirmPassword:"", address:"", gender:""})
        
    // some messages under input to make user know that the data he enterd is not what we want
    const [validation, setValidation] = useState({})

    // messages comes from server
    const [serverMessage, setServerMessage] = useState("")

    const navigate = useNavigate() // to navigate
    const {store, setStore} = useMyStore()

    
    const submition = async (e) => {
        e.preventDefault(); // prevent reload 
        let errors = {} // collect messages 

        // validate data
        if (!data.firstName.trim()) errors.firstName = "First name is required";
        else if (data.firstName.trim().length < 2) errors.firstName = "Invalid name";
        else if (!/^[\p{L} ]+$/u.test(data.firstName.trim())) errors.firstName = "Invalid name";

        if (!data.lastName.trim()) errors.lastName = "Last name is required";
        else if (data.lastName.trim().length < 2) errors.lastName = "Invalid name";
        else if (!/^[\p{L} ]+$/u.test(data.lastName.trim())) errors.lastName = "Invalid name";

        if (!data.email) errors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email address";

        if (!data.phoneNumber) errors.phoneNumber = "Phone number is required";
        else if (!/^(010|011|012|015)\d{8}$/.test(data.phoneNumber)) errors.phoneNumber = "Invalid Egyptian phone number";

        if (!data.password) errors.password = "Password is required";
        else if (!/^(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password))
        errors.password = "Password must be at least 8 characters long and include number and symbol";

        if (!data.confirmPassword) errors.confirmPassword = "Please confirm your password";
        else if (data.confirmPassword !== data.password)
        errors.confirmPassword = "Passwords do not match";

        if (!data.gender) errors.gender = "Gender is required";
        else if (!["male", "female"].includes(data.gender.toLowerCase()))
        errors.gender = "Invalid gender";

        if (!data.address.trim()) errors.address = "Address is required";

        // --- apply errors ---
        setValidation(errors);

        // send data to back and get the response
        const callBack = async () => {
            try{
                const res = await fetch("https://masproback.vercel.app/api/auth/signup",{
                    method:"POST",
                    headers:{"content-type":"application/json"},
                    credentials:"include",
                    body:JSON.stringify(data)
                })

                const resData = await res.json()
                if(!res.ok){
                    setServerMessage(resData.message)
                    if(resData.order == "login"){
                        setStore("serverMessage", resData.message)
                        navigate('/signin')
                    } 
                }else{
                    setStore("serverMessage", resData.message)
                    navigate('/verify-email')
                }
            }
            catch(error){
                console.log(error.message)
                return {message: error.message}
            }
        }

        // don't call back when the data is not what we need
        if(! Object.values(errors).some(v => v != "") ){
            await callBack()
        }

    }



    return (
        <div className='bg-gray-100 min-h-screen  flex items-center justify-center p-4'>

            {/* card of form */}
            <motion.div initial={{scale:.1}} animate={{scale:1}} transition={{duration:.3, type:"spring", stiffness:100} }
                     className='bg-white w-full max-w-[600px] p-6 space-y-6 shadow-xl rounded-2xl'>

                <h2 className='text-center text-[25px] capitalize'>Sign Up</h2>
                
                <form onSubmit={submition} className='space-y-4'>
                    <div className='flex gap-4 justify-between'>
                        <Input placeholder="First Name" name="firstName" validation={validation} onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                        <Input placeholder="Last Name" name="lastName" validation={validation} onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    </div>
                    <Input placeholder="Email" name="email" validation={validation} onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    <Input placeholder="Phone Number" name="phoneNumber" validation={validation} onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    <div className='flex gap-4 justify-between'>
                        <Input placeholder="password" name="password" validation={validation} type='password' onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                        <Input placeholder="confirm Password" name="confirmPassword" type='password' validation={validation} onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <Input placeholder="Adress" name="address" validation={validation} onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                        
                        <div className='w-1/3'>
                            <select name="gender" id="" 
                                    onChange={(e) => setData((prev) => ({...prev, [e.target.name]:e.target.value}))}
                                    className={`${data.gender == "" && "text-gray-400"} w-full border-gray-300 outline-none border p-2 block rounded-md`}>
                                        
                                <option value="" className='bg-black text-white'>Gender</option>
                                <option value="Male" className='bg-black text-white'>Male</option>
                                <option value="Female" className='bg-black text-white'>Female</option>
                            </select>
                            {validation.gender && <p className='text-[9px] sm:text-sm text-red-600'>{validation.gender}</p>}
                        </div>
                    </div>


                    <button type='submit' 
                        className='bg-black text-white w-full p-[10px] rounded-md font-semibold 
                        hover:opacity-80 cursor-pointer'>Sign Up</button>

                </form>

            </motion.div>
            
        </div>
    );
}

export default SignUp;
