import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const Message = ({ message, setMessage, duration = 5000 }) => {


    // auto close message after 5 seconds
  useEffect(() => {
    if (message) {
        // close message after "duration" milliseconds
        const timer = setTimeout(() => setMessage(""), duration); 
        return () => clearTimeout(timer); // clear timer
    }
  }, [message, setMessage, duration]);

  const closeMessage = () =>  setMessage("")

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="fixed top-5 z-[9999] right-5 flex items-center justify-between min-w-[300px] max-w-sm bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-3 rounded-lg"
        >
          <span className="text-sm font-semibold">{message}</span>
          <button 
            onClick={closeMessage} 
            className="ml-4 text-black hover:bg-gray-100 rounded-full p-1 transition-colors"
          >
            <IoClose size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;