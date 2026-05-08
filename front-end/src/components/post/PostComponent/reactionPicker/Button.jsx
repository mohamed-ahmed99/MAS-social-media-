import { motion } from "framer-motion"
import { AiOutlineLike } from "react-icons/ai"

export default function Button({ handleMainClick, selectedReaction }) {
    return (
        <button
            onClick={handleMainClick}
            className={`group flex items-center gap-2 px-2 sm:px-6 py-2 rounded-xl transition-all duration-300 hover:bg-gray-50 active:scale-95 ${selectedReaction ? selectedReaction.color : 'text-gray-500 hover:text-gray-800'}`}
        >
            <motion.div
                key={selectedReaction ? selectedReaction.id : 'none'}
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="flex items-center justify-center"
            >
                {selectedReaction ? (
                    <div className="w-6 h-6 flex items-center justify-center drop-shadow-sm">
                        {selectedReaction.icon}
                    </div>
                ) : (
                    <AiOutlineLike className="w-6 h-6 transition-transform group-hover:scale-110" />
                )}
            </motion.div>

            <span className="font-bold text-[15px] select-none">
                {selectedReaction ? selectedReaction.label : 'Like'}
            </span>
        </button>
    )
}