import { motion } from 'framer-motion';

export default function PostImageDisplay({ url, onClear }) {
  if (!url) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative w-full aspect-video flex-shrink-0 rounded-2xl overflow-hidden border border-gray-100 bg-gray-100 shadow-sm group mb-4 ring-1 ring-black/5"
    >
      <img 
        src={url} 
        alt="Post preview" 
        className="w-full h-full object-cover"
      />

      {onClear && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
