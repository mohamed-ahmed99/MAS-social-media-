import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import GeneralBtn from '../../components/btns/GeneralBtn';
import { usePostMethod } from '../../hooks/usePostMethod'
import Message from '../../components/Message';
import { useGlobalData } from '../../hooks/useStore';

export default function VerifyEmail() {

    // my hooks
    const [store, setGlobalData] = useGlobalData()
    const { postData, status_p, message_p, data_p, loading_p } = usePostMethod()

    // hooks
    const inputsRefs = useRef([]) // refs for input fields
    const navigate = useNavigate()
    const location = useLocation()

    // states
    const [validation, setValidation] = useState("")
    const [serverMessage, setServerMessage] = useState(message_p ? message_p : "")


    // clear messages after 5 seconds
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setValidation("")
            setServerMessage("")
        }, 5000)
        return () => clearTimeout(timeOut)
    }, [validation])

    // handle input change
    const handleContent = (e, index) => {
        if (!/^[0-9]*$/.test(e.target.value)) setValidation("only numbers are allowed")
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1)
        e.target.value = value

        // move to next if value entered
        if (value && index < 5) {
            inputsRefs.current[index + 1].focus()
        }
    }

    // handle backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputsRefs.current[index - 1].focus()
        }
    }

    // handle paste
    const handlePaste = (e) => {
        e.preventDefault() // prevent default paste
        // get code from clipboard
        const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6)
        // fill inputs
        paste.split("").forEach((num, i) => {
            if (inputsRefs.current[i]) {
                inputsRefs.current[i].value = num
            }
        })
        // move to next input
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

        if (getCode.length === 6) {
            // call api
            await postData("/api/auth/verify-email", {}, { code: getCode })
        } else {
            setValidation("Missing email or code.")
        }
    }


    useEffect(() => {
        if (status_p === "success") {
            setGlobalData("authenticated", true)
            setGlobalData("user", { ...data_p })
            navigate("/")
        }
        else if (status_p === "fail") {
            setServerMessage(message_p)
        }
    }, [status_p, data_p, message_p])

    // --- ANIMATION VARIANTS ---
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 15 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                type: "spring",
                stiffness: 120,
                damping: 20,
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }
    };

    const codeInputs = Array(6).fill(0).map((_, index) => (
        <motion.input
            variants={inputVariants}
            key={index}
            type="text"
            maxLength={1}
            onChange={(e) => handleContent(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputsRefs.current[index] = el)}
            className="w-8 h-10 vsm2:w-10 vsm2:h-12 vsm:w-12 vsm:h-14 sm:w-16 sm:h-16 outline-none bg-gray-50 border-[1.5px] border-gray-300 rounded-lg sm:rounded-xl block p-2 text-2xl font-semibold text-center focus:border-black/80 focus:ring-1 focus:ring-black/80 focus:bg-white shadow-sm transition-all duration-200"
        />
    ))

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">

            {/* message */}
            <Message
                message={serverMessage}
                setMessage={setServerMessage}
                duration={5000}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white w-full max-w-[600px] p-8 sm:p-10 space-y-8 shadow-xl border border-gray-100 rounded-3xl"
            >
                <div className="space-y-2">
                    <motion.h2 variants={itemVariants} className="text-center text-[26px] sm:text-[28px] font-bold text-gray-900 capitalize tracking-tight">
                        verify email
                    </motion.h2>
                    <motion.p variants={itemVariants} className='text-[12px] sm:text-sm text-gray-500 text-center tracking-wide'>
                        You will find The code message in spam
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex gap-2 sm:gap-4 justify-center items-center py-2 h-[75px]">
                        {codeInputs}
                    </div>

                    {/*//////////////////////// validation message ////////////////////////*/}
                    <div className="">
                        <AnimatePresence>
                            {validation && (
                                <motion.p
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-red-500 text-center text-sm font-medium"
                                >
                                    {validation}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="w-full mt-4"
                    >
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <GeneralBtn
                                type='submit'
                                loading={loading_p}
                                disabled={loading_p}
                                text="Send"
                                variant="black"
                                className="shadow-md py-3"
                            />
                        </motion.div>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    )
}

