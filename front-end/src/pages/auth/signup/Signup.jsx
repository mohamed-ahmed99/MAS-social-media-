import { useEffect, useState } from 'react';
import Input from '../../../components/Input'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { validateSignup } from './validation';
import {usePostMethod} from "../../../hooks/usePostMethod"
import List from '../../../components/List';
import GeneralBtn from '../../../components/btns/GeneralBtn';
import Message from '../../../components/Message';

const SignUp = () => {

    // hooks
    const navigate = useNavigate() // to navigate
    const { postData, status_p, message_p, data_p, loading_p } = usePostMethod()

    // data I want from user
    const [data, setData] = useState(
        {firstName:"", lastName:"", email:"", phoneNumber:"", password:"", confirmPassword:"", address:"", gender:""}
    )
        
    // some messages under input to make user know that the data he enterd is not what we want
    const [validation, setValidation] = useState({})

    // Clear errors after 5 seconds
    useEffect(() => {
        const hasErrors = Object.values(validation).some(err => err);
        if (hasErrors) {
            const timer = setTimeout(() => {
                setValidation({});
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [validation]);

    // Handle input change and clear specific error
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        
        // Remove error message for this specific field when user starts typing
        if (validation[name]) {
            setValidation(prev => ({ ...prev, [name]: "" }));
        }
    };
    
    const submition = async (e) => {
        e.preventDefault(); // prevent reload 
        let errors = {} // collect messages 

        // validate data
        errors = validateSignup(data)
        setValidation(errors); // apply errors

        // don't call back when the data is not what we want
        if(! Object.values(errors).some(v => v != "") ){
            console.log(data)

            // Format data to match backend schema expectations
            const payload = {
                personalInfo: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender
                },
                contactInfo: {
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    address: data.address
                },
                account: {
                    password: data.password
                }
            };

            // http://localhost:5150/api/auth/signup
            // https://masproback.vercel.app/api/auth/signup
            await postData("https://masproback.vercel.app/api/auth/signup", {}, payload)
        }

    }
    const [message, setMessage] = useState(message_p)

    useEffect(() => {
        // if there is a message from back-end and it's not a success message
        if(message_p && status_p !== "success") {
            setMessage(message_p)
        }

        // if validation
        if(status_p === "validation") {
            const newValidation = {};
            for (const key in data_p?.errors) {
                const shortKey = key.split('.').pop(); // get last part of the key
                newValidation[shortKey] = data_p.errors[key]; 
            }
            setValidation(newValidation);
        }

        // if successful
        if(status_p === "success") {
            navigate("/auth/verify-email")
        }


        console.log({status_p, message_p, data_p, loading_p})
    }, [status_p, data_p, message_p])

    return (
        <div className='bg-gray-100 min-h-screen flex md:items-center justify-center p-4 relative'>
            
            {/* message */}
            <Message 
                message={message} 
                setMessage={setMessage}
                duration={5000}
            />

            {/* card of form */}
            <motion.div 
                initial={{scale:.8, opacity: 0}} 
                animate={{scale:1, opacity: 1}} 
                transition={{duration:.4, type:"spring", stiffness:100} }
                className='bg-white w-full h-fit max-w-[700px] vsm:mt-[100px] p-6 space-y-6 shadow-xl rounded-2xl'
            >

                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className='text-center text-[25px] capitalize font-bold'
                >
                    Sign Up
                </motion.h2>
                
                <motion.form 
                    onSubmit={submition} 
                    className='space-y-4'
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {staggerChildren: 0.1, delayChildren: 0.2}
                        }
                    }}
                >
                    <div className='flex flex-col md:flex-row gap-4 justify-between'>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="w-full">
                            <Input 
                                placeholder="First Name" 
                                name="firstName" 
                                error={validation.firstName} 
                                onChange={handleChange}
                            />
                        </motion.div>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="w-full">
                            <Input 
                                placeholder="Last Name" 
                                name="lastName" 
                                error={validation.lastName} 
                                onChange={handleChange}
                            />
                        </motion.div>
                    </div>
                    
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="w-full">
                        <Input 
                            placeholder="Email" 
                            name="email" 
                            error={validation.email} 
                            onChange={handleChange}
                        />
                    </motion.div>
                    
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="w-full">
                        <Input 
                            placeholder="Phone Number" 
                            name="phoneNumber" 
                            error={validation.phoneNumber} 
                            onChange={handleChange}
                        />
                    </motion.div>
                    
                    <div className='flex flex-col md:flex-row gap-4 justify-between'>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="w-full">
                            <Input  
                                placeholder="password" 
                                name="password" 
                                error={validation.password} 
                                type='password' 
                                onChange={handleChange}
                            />
                        </motion.div>
                        
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="w-full">
                            <Input 
                                placeholder="confirm Password" 
                                name="confirmPassword" 
                                type='password' 
                                error={validation.confirmPassword} 
                                onChange={handleChange}
                            />
                        </motion.div>
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-4 justify-between'>
                        <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="w-full">
                            <Input 
                                placeholder="Adress" 
                                name="address" 
                                error={validation.address} 
                                onChange={handleChange}
                            />
                        </motion.div>
                        
                        <motion.div 
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: { y: 0, opacity: 1 }
                            }}
                            className='md:w-1/3 w-full'
                        >
                           <List
                            name="gender"
                            options={[
                                { value: "Male", label: "Male" },
                                { value: "Female", label: "Female" }
                            ]}
                            value={data.gender}
                            onChange={handleChange}
                            error={validation.gender}
                            placeholder="Select Gender"
                           />
                        </motion.div>
                    </div>


                    <motion.div
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 }
                        }}
                        className="w-full"
                    >
                        <GeneralBtn 
                            type='submit' 
                            loading={loading_p}
                            disabled={loading_p}
                            text="Sign Up"
                            variant="black"
                        />
                    </motion.div>

                </motion.form>

            </motion.div>
            
        </div>
    );
}

export default SignUp;
