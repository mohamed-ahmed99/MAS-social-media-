import { motion } from "framer-motion"
import { AiOutlineLike } from "react-icons/ai"
import { PuffLoader } from 'react-spinners'

export default function Button({ 
  handleMainClick,
  selectedReaction,
  loading, 
  reactionsData
}) {
    return (
        <button
            onClick={handleMainClick}
            className={`group flex items-center gap-2 px-2 sm:px-6 py-2 rounded-xl transition-all duration-300 hover:bg-gray-50 active:scale-95 ${selectedReaction ? selectedReaction.color : 'text-gray-500 hover:text-gray-800'}`}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="flex items-center justify-center"
            >
                {selectedReaction ? (
                    <div className="w-6 h-6 flex items-center justify-center drop-shadow-sm">
                        {reactionsData.find((r) => r.id === selectedReaction.id)?.icon}
                    </div>
                ) : (
                    <AiOutlineLike className="w-6 h-6 transition-transform group-hover:scale-110" />
                )}
            </motion.div>

            <span className="font-bold text-[15px] select-none">
                {selectedReaction ? 
                    (loading ? 
                        <PuffLoader size={30}/>
                         : selectedReaction.label
                    ) 
                    : 'Like'
                }
            </span>
        </button>
    )
}