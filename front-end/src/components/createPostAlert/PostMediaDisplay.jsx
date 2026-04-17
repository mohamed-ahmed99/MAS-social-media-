import { motion, AnimatePresence } from 'framer-motion';

export default function PostMediaDisplay({ mediaUrl }) {
  if (!mediaUrl) return null;

  const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/) || mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className='mt-3 relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 max-h-[250px] flex items-center justify-center'
    >
      {isVideo ? (
        <video
          src={mediaUrl}
          controls
          className="w-full max-h-[250px] object-contain"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={mediaUrl}
          alt="Preview"
          className="w-full max-h-[250px] object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
    </motion.div>
  );
}
