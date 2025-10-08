import { useEffect, useState } from 'react';
import Input from '../components/Input'

const SignUp = () => {

    const [data, setData] = useState(
        {firstName:"", lastName:"", email:"", phoneNumber:"", password:"", confirmPassword:"", address:"", gender:""})
        
    const [validation, setValidation] = useState(
        {firstName:"", lastName:"", email:"", phoneNumber:"", password:"", confirmPassword:"", address:"", gender:""})


    
    const submition = async (e) => {
        e.preventDefault();

        // check firstName
        if(!data.firstName.trim()) setValidation(prev => ({...prev, firstName:"first name is required"}))
        else if(data.firstName.trim().length < 2) setValidation(prev => ({...prev, firstName:"Invalid name"}))
        else if(! /^[\p{L} ]+$/u.test(data.firstName.trim())) setValidation(prev => ({...prev, firstName:"Invalid name"}))
        else setValidation(prev => ({...prev, firstName:""}))

        // check lastName
        if(!data.lastName.trim()) setValidation(prev => ({...prev, lastName:"last name is required"}))
        else if(data.lastName.trim().length < 2) setValidation(prev => ({...prev, lastName:"Invalid name"}))
        else if(! /^[\p{L} ]+$/u.test(data.lastName.trim())) setValidation(prev => ({...prev, lastName:"Invalid name"}))
        else setValidation(prev => ({...prev, lastName:""}))

        // check email
        if (!data.email) setValidation(prev => ({ ...prev, email: "Email is required" }));
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) setValidation(prev => ({ ...prev, email: "Invalid email address" }));
        else setValidation(prev => ({...prev, email:""}))

        // check phoneNumber
        if (!data.phoneNumber) setValidation(prev => ({ ...prev, phoneNumber: "Phone number is required" }));
        else if (!/^(010|011|012|015)\d{8}$/.test(data.phoneNumber)) setValidation(prev => ({ ...prev, phoneNumber: "Invalid Egyptian phone number" }));
        else setValidation(prev => ({...prev, phoneNumber:""}))

        // check password
        if (!data.password) setValidation(prev => ({ ...prev, password: "Password is required" }));
        else if (!/^(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)) setValidation(prev => ({ ...prev, password: "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol" }));
        else setValidation(prev => ({...prev, password:""}))
    
        // confirmPassword
        if (!data.confirmPassword) setValidation(prev => ({ ...prev, confirmPassword: "Please confirm your password" }));
        else if (data.confirmPassword !== data.password) setValidation(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
        else setValidation(prev => ({...prev, confirmPassword:""}))

        // check gender
        if (!data.gender) setValidation(prev => ({ ...prev, gender: "Gender is required" }));
        else if (!["male", "female"].includes(data.gender.toLowerCase())) setValidation(prev => ({ ...prev, gender: "Invalid gender" }));
        else setValidation(prev => ({...prev, gender:""}))
    
        // check address
        if (!data.address) setValidation(prev => ({ ...prev, address: "Address is required" }));
        else setValidation(prev => ({...prev, address:""}))
    }



    return (
        <div className='bg-gray-100 min-h-screen  flex items-center justify-center p-4'>

            <div className='bg-white w-full max-w-[600px] p-6 space-y-6 shadow-xl rounded-2xl'>
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

            </div>
            
        </div>
    );
}

export default SignUp;
