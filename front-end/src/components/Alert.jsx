import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {useMyStore} from '../hooks/useMyStore'

export default function Alert({ message, alertKey }) {

  const [show, setShow] = useState(true)
  const {store, setStore} = useMyStore()

  useEffect(() => {
    setShow(true) 
    const timeout = setTimeout(() => {
        setShow(false)
        setStore("serverMessage", "")        
    }, 10000)
    return () => clearTimeout(timeout)
  }, [alertKey])

  if(message)
  return (
    <motion.div
      initial={{ x: '200%' }}
      animate={{ x: show ? -15 : '200%' }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed flex items-center gap-3 z-[999] top-5 right-1 sm:right-5 text-sm sm:text-[16px] font-normal bg-black py-4 sm:py-4 px-6 sm:px-8 text-white sm:font-semibold rounded-lg"
    >
      <span  onClick={() => setShow(false)}
          className='absolute hover:cursor-pointer top-1/2 -translate-y-1/2 -left-[126px] border-2 text-black font-bold border-black h-7 w-7 flex items-center justify-center rounded-full'>X</span>
      <hr className='h-[2px] absolute top-1/2 -translate-y-1/2 -left-[100px]  border-none bg-black w-[100px]'/>

      {message}
    </motion.div>
  )

  // return null
}

