import {motion} from 'framer-motion'



export default function MainAlert({serverMessage}){

    if(serverMessage)
    return (
        <motion.div initial={{x:"100%"}} animate={serverMessage ? {x:0}: {x:"100%"}}
            className="fixed top-5 right-5 bg-black py-4 px-8 text-white font-semibold rounded-lg">
            {serverMessage}
        </motion.div>
    )
}