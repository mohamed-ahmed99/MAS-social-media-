import { useState } from 'react';
import Input from '../components/Input'
import NavAuth from '../components/NavAuth';

const SignUp = () => {

    const [data, setData] = useState(
        {firstName:"", lastName:"", email:"", phoneNumber:"", password:"", confirmPassword:"", address:"", gender:""})

        



    return (
        <div className='bg-gray-100 min-h-screen  flex items-center justify-center'>

            <div className='bg-white w-full max-w-[600px] p-6 space-y-6 shadow-xl rounded-2xl'>
                <h2 className='text-center text-[25px] capitalize'>Sign Up</h2>
                
                <form action="" className='space-y-4'>
                    <div className='flex gap-4 justify-between'>
                        <Input placeholder="First Name" name="firstName" onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                        <Input placeholder="Last Name" name="lastName" onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    </div>
                    <Input placeholder="Email" name="email" onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    <Input placeholder="Phone Number" name="phoneNumber" onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    <div className='flex gap-4 justify-between'>
                        <Input placeholder="password" name="password" type='password' onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                        <Input placeholder="confirm Password" name="confirmPassword" type='password' onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <Input placeholder="Adress" name="address" onChange={(e) => setData(prev => ({...prev, [e.target.name]: e.target.value}))}/>
                        <div className='text-gray-400'>
                            <select name="gender" id="" 
                                    onChange={(e) => setData((prev) => ({...prev, [e.target.name]:e.target.value}))}
                                    className='outline-none border p-2 block border-gray-300 rounded-md'>
                                        
                                <option value="" className='bg-black text-white'>Gender</option>
                                <option value="Male" className='bg-black text-white'>Male</option>
                                <option value="Female" className='bg-black text-white'>Female</option>
                            </select>
                        </div>
                    </div>

                    <button type='submit' 
                        className='bg-black text-white w-full p-3 rounded-md font-semibold 
                        hover:opacity-80 cursor-pointer'>Sign Up</button>

                </form>

            </div>
            
        </div>
    );
}

export default SignUp;
