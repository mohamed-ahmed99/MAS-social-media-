import {motion, AnimatePresence} from 'framer-motion'
import { useState } from 'react';
import { IoClose } from "react-icons/io5";


export function FullScreenImage ({showPostImage, setShowPostImage, img, userName, text}) {
    const [seeAllText, setSeeAllText] = useState(false) 


    return(
    <>
        {showPostImage && (
            <AnimatePresence>
                <motion.div
                className="fixed inset-0 bg-[#101010] z-[999] flex items-center justify-center p-4 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPostImage(false)}
                >
                    <div className="relative flex items-center justify-center">
                        <button className="absolute -top-14 right-0 text-white"
                            onClick={() => setShowPostImage(false)}>
                            <IoClose fontSize={25}/>
                        </button>

                        <motion.img
                        src={img}
                        alt=""
                        onClick={(e) => e.stopPropagation()} 
                        className="max-w-[95%] max-h-[95%] rounded-lg shadow-xl object-contain after:"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                    </div>
                    <div className='absolute bottom-10 text-center text-white px-4' 
                        onClick={(e) => e.stopPropagation()}>
                        <h3 className='text-gray-300'>{userName}</h3>
                        <p className='text-sm text-gray-500'
                            onClick={() => setSeeAllText(prev => !prev)}
                            >{`${seeAllText? text : text.split('').slice(0,100).join("") + '...'}`}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
            )
        }
    </>
    )
}