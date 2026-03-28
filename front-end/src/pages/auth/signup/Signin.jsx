import { useEffect, useState } from 'react';
import Input from '../../../components/Input'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import GeneralBtn from '../../../components/btns/GeneralBtn';
import { validateSignin } from './validation';
import { usePostMethod } from '../../../hooks/usePostMethod';
import Message from '../../../components/Message';


const SignIn = () => {

    // my hooks
    const { postData, status_p, message_p, data_p, loading_p } = usePostMethod()

    // hooks
    const navigate = useNavigate()

    // states
    const [data, setData] = useState({ email: "", password: "" })
    const [validation, setValidation] = useState({ email: "", password: "" })
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)




    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value })); // update state

        // Remove error message for this specific field when user starts typing
        if (validation[name]) {
            setValidation(prev => ({ ...prev, [name]: "" })); // remove error message
        }
    };




    // submition
    const submition = async (e) => {
        e.preventDefault();
        const errors = validateSignin(data)

        setValidation(errors) // validation messages

        // api url
        // http://localhost:5150/api/auth/signin
        // https://masproback.vercel.app/api/auth/signin

        //  call api if no errors
        if (!Object.values(errors).some(v => v != "")) {
            await postData(" https://masproback.vercel.app/api/auth/signin", {}, data)
        }

    }

    // handle api response
    useEffect(() => {

        // if there is a message from back-end and it's not a success message
        if (message_p && status_p !== "success") {
            setMessage(message_p)
        }

        // if validation
        if (status_p === "validation") {
            const newValidation = {};
            for (const key in data_p?.errors) {
                const shortKey = key.split('.').pop(); // get last part of the key
                newValidation[shortKey] = data_p.errors[key];
            }
            setValidation(newValidation);
        }

        // if successful
        if (status_p === "success") {
            navigate("/")
        }


        console.log({ status_p, message_p, data_p, loading_p })

    }, [status_p])





    return (
        <div className='bg-gray-100 min-h-screen  flex items-center justify-center p-4'>

            {/* message */}
            <Message
                message={message}
                setMessage={setMessage}
                duration={6000}
            />

            <motion.div initial={{ scale: .1 }} animate={{ scale: 1 }} transition={{ duration: .3, type: "spring", stiffness: 100 }}
                className='bg-white w-full max-w-[600px] p-6 space-y-6 shadow-xl rounded-2xl'>

                <h2 className='text-center text-[25px] capitalize'>Sign In</h2>

                {/* form */}
                <form onSubmit={submition} className='space-y-4'>

                    {/* email */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3, type: "spring", stiffness: 100, delay: .1 }}
                    >
                        <Input
                            placeholder="Email"
                            name="email"
                            error={validation.email}
                            onChange={handleChange}
                        />

                    </motion.div>

                    {/* password */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3, type: "spring", stiffness: 100, delay: .2 }}
                    >
                        <Input
                            placeholder="Password"
                            name="password"
                            error={validation.password}
                            type='password'
                            onChange={handleChange}
                        />
                    </motion.div>

                    {/* <button type='submit' disabled={loading} 
                        className='bg-black text-white w-full p-3 rounded-md font-semibold 
                        hover:opacity-80 cursor-pointer'>Sign In
                    </button> */}

                    {/* sign in btn */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3, type: "spring", stiffness: 100, delay: .3 }}
                    >
                        <GeneralBtn
                            type="submit"
                            loading={loading}
                            disabled={loading}
                            text="Sign In"
                            className="w-full"
                            variant="black"
                        />
                    </motion.div>   

                </form>

            </motion.div>

        </div>
    );
}

export default SignIn;
