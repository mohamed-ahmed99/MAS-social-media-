import {motion} from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMyStore } from '../hooks/useMyStore'

export default function Alert({message}){
    if(!message) return
    const [show, setShow] = useState(true)
    const {store, setStore} = useMyStore()

    useEffect(() => {
        setShow(true)
        const timeOut = setTimeout(() => {
            setShow(false)
            setStore("serverMessage", "")
        }, 5000);

        return () => clearTimeout(timeOut)
    },[message])


    const listOfOBJ = Object.values(message).map((msg, index) => (<li key={index}>{msg}</li>))

    return (
        <motion.div initial={{x:"150%"}} animate={{x:show ? -15 : "150%"}} transition={{type:"spring", stiffness:100}}
            className="fixed z-[999] top-5 right-1 sm:right-5 text-sm sm:text-[16px] font-normal   bg-black py-4 sm:py-4 px-6 sm:px-8 text-white sm:font-semibold rounded-lg">
            {typeof message == "object" ? <ul>{listOfOBJ}</ul> : message}
        </motion.div>
    )
}