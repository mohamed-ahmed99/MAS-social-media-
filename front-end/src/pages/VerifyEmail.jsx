import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import {useMyStore} from '../hooks/useMyStore'
import Alert from '../components/Alert'

export default function VerifyEmail() {
  const inputsRefs = useRef([])
  const navigate = useNavigate()
  const {store, setStore} = useMyStore()
  const location = useLocation()

  
  const [validation, setValidation] = useState("")
  const [serverMessage, setServerMessage] = useState({})
  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log(validation)
      setValidation("")
      setServerMessage("")
    }, 5000)
    return () => clearTimeout(timeOut)
  }, [validation])


  const handleContent = (e, index) => {
    if (!/^[0-9]*$/.test(e.target.value)) setValidation("only numbers are allowed")
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1)
    e.target.value = value

    // move to next if value entered
    if (value && index < 5) {
      inputsRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6)
    paste.split("").forEach((num, i) => {
      if (inputsRefs.current[i]) {
        inputsRefs.current[i].value = num
      }
    })//
    // move focus to last filled input
    const nextIndex = Math.min(paste.length, 5)
    inputsRefs.current[nextIndex]?.focus()
  }



  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const getCode = inputsRefs.current.map(i => i.value).join("")
    console.log("Verification code:", getCode)
    
    // check if all 6 digits are entered
    if (getCode.length < 6) {
      setValidation("Please enter the complete 6-digit code.")
      return
    }


    const callAPI = async () => {
      try {
        // https://masproback.vercel.app/api/auth/verify-email
        // http://localhost:5150//auth/verify-email
        const res = await fetch("http://localhost:5150/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ code: getCode, email: store.userEmail })
        })
        
        const data = await res.json()
        console.log(data)
        if (!res.ok) {
          setServerMessage({message: data.message, key:Math.random()})
          return { message: data.message || "Verification failed." }
        }else{
          localStorage.setItem("MASproAuth", data.user.token)
          data.user.token = ""
          setStore("user", data.user)
          navigate("/profile/")
        }
      } catch (error) {
        setServerMessage({message: error.message, key:Math.random()})
        return { message: error.message || "An error occurred during verification." }
      }
    }

    if(store.userEmail && getCode.length === 6){
      await callAPI()
    }else{
      setValidation("Missing email or code.")
    }
  }


  const codeInputs = Array(6).fill(0).map((_, index) => (
    <input
      key={index}
      type="text"
      maxLength={1}
      onChange={(e) => handleContent(e, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      onPaste={handlePaste}
      ref={(el) => (inputsRefs.current[index] = el)}
      className="w-6 h-6 vsm2:w-8 vsm2:h-8 vsm:w-10 vsm:h-10 sm:w-14 sm:h-14  outline-none border border-gray-400 rounded-lg sm:rounded-xl block p-2 text-2xl text-center"
    />
  ))

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">

      {serverMessage.message && <Alert message={serverMessage.message} alertKey={serverMessage.key} />}

      <motion.div
        initial={{ scale: 0.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        className="bg-white w-full max-w-[600px] p-6 space-y-6 shadow-xl rounded-2xl"
      >
        <div>
            <h2 className="text-center text-[25px] capitalize">verify email</h2>
             <p className='text-[11px] vsm2:text-[13px] sm:text-sm text-gray-500 text-center tracking-widest'>You will find The code message in spam</p>
        </div>
       

        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 sm:gap-5 justify-center">{codeInputs}</div>

          {validation && (

            
            <motion.p initial={{ opacity: 0 , scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .7 }}
              className="text-red-500 text-center text-sm mt-2">{validation}</motion.p>
          )}
          <button
            type="submit"
            className="bg-black mt-4 text-white w-full p-3 rounded-md font-semibold 
              hover:opacity-80 cursor-pointer"
          >
            Send
          </button>
        </form>
      </motion.div>
    </div>
  )
}


