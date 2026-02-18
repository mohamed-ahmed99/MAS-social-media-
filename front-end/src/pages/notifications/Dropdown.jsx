import {motion} from "framer-motion"
import { useNotifications } from "./useNotification";


// my hooks

export default function Dropdown() {

  const {notifications, fetchedCount, loading, status, loadMore } = useNotifications(20)
  console.log({notifications, fetchedCount, loading, status })

  return (
    
    <motion.div 
        initial={{top:0, opacity:0}}
        animate={{top:80, opacity:1}}

        className="absolute top-0 right-4 z-[999] w-80 bg-white shadow-xl rounded-xl p-4 ">
      <h2 className="font-bold text-lg mb-3">Notifications</h2>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
          New message from Ahmed
        </div>

        <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
          Your order has been shipped
        </div>
      </div>

      <button onClick={() => loadMore}>hello</button>
    </motion.div>
  );
}
