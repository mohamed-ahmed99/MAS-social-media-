import { motion } from "framer-motion"


export default function FloatingReactionBar({ handleSelect, reactions }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 350 }}
            className="absolute left-0 bottom-full mb-3 bg-white/95 backdrop-blur-md border border-gray-100 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-1.5 px-5 flex items-center gap-1.5 z-50 origin-bottom"
        >
            {reactions.map((reaction, index) => (
              <motion.button
                key={reaction.id}
                whileHover={{ 
                  scale: 1.45, 
                  y: -13,
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.85 }}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0, 
                  transition: { 
                    delay: index * 0.04, 
                    type: 'spring',
                    stiffness: 260,
                    damping: 20
                  } 
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(reaction);
                }}
                className="relative group w-9 h-9 flex items-center justify-center hover:bg-white rounded-full transition-colors duration-200"
              >
                {/* Label Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-sm">
                  {reaction.label}
                </span>
                
                <div className="w-7 h-7 flex items-center justify-center transform transition-transform">
                  {reaction.icon}
                </div>
              </motion.button>
            ))}
        </motion.div>
    )
}