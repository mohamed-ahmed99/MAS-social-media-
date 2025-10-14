import {motion} from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMyStore } from '../hooks/useMyStore'

export default function MainAlert({message}){
    if(!message) return
    const [show, setShow] = useState(true)
    const {store, setStore} = useMyStore()

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setShow(false)
            setStore("serverMessage", "")
        }, 5000);

        return () => clearTimeout(timeOut)
    },[message])

    return (
        <motion.div initial={{x:"100%"}} animate={{x:show ? -15 : "100%"}} transition={{type:"spring", stiffness:100}}
            className="fixed z-[999] top-5 right-1 sm:right-5 text-sm sm:text-[16px] font-normal   bg-black py-4 sm:py-4 px-6 sm:px-8 text-white sm:font-semibold rounded-lg">
            {message}
        </motion.div>
    )
}