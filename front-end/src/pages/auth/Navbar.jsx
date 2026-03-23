import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const location = useLocation();


    // set the link text and path based on the current location
    const [link, setLink] = useState({text:"", path:""})

    // set the link text and path based on the current location
    useEffect(() => {
        if(location.pathname === "/auth/signup") {
            setLink({text:"Sign In", path:"/auth/signin"})
        }else if(location.pathname === "/auth/signin") {
            setLink({text:"Sign Up", path:"/auth/signup"})
        }else{
            setLink({text:"Sign In", path:"/auth/signin"})
        }
    }, [location.pathname])


    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
            className="fixed top-0 z-[999] w-full flex items-center justify-between px-6 py-4 bg-white text-black"
        >

            {/* logo */}
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                <motion.img 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    src="/logo4.png" alt="MAS Logo" className="h-10 object-contain" 
                />
            </Link>
            
            {/* sign in or sign up button */}
            <div className="flex items-center gap-4">
               <Link 
                    to={link.path} 
                    className="px-5 py-2 text-sm font-bold rounded-lg bg-black text-white hover:bg-zinc-800 transition-colors min-w-[100px] flex justify-center items-center overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={link.text}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="block"
                        >
                            {link.text}
                        </motion.span>
                    </AnimatePresence>
               </Link>
            </div>
        </motion.nav>
    );
}