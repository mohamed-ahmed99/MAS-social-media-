import { motion } from 'framer-motion';

export default function PostMediaDisplay({ mediaUrl, onClear, mediaType }) {
  if (!mediaUrl) return null;

  // Function to process URL and return embeddable version if necessary
  const getEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      
      // YouTube handling
      if (parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be')) {
        let videoId = '';
        if (parsedUrl.hostname.includes('youtu.be')) {
          videoId = parsedUrl.pathname.slice(1);
        } else {
          videoId = parsedUrl.searchParams.get('v');
        }
        return `https://www.youtube.com/embed/${videoId}`;
      }
      
      // Vimeo handling
      if (parsedUrl.hostname.includes('vimeo.com')) {
        const videoId = parsedUrl.pathname.slice(1);
        return `https://player.vimeo.com/video/${videoId}`;
      }

      // Default to the provided URL (works for direct image/video or already-embed links)
      return url;
    } catch (e) {
      return url;
    }
  };

  const embedUrl = getEmbedUrl(mediaUrl);
  const isImage = mediaType === "image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="relative w-full aspect-video flex-shrink-0 rounded-2xl overflow-hidden border border-gray-100 bg-gray-100 shadow-sm group mb-4 ring-1 ring-black/5"
    >
      {isImage ? (
        <img 
          src={mediaUrl} 
          alt="Post preview" 
          className="w-full h-full object-cover"
        />
      ) : (
        <iframe
          src={embedUrl}
          className="w-full h-full border-none pointer-events-auto"
          title="Post media content"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      {/* Close button - visible on hover on desktop, always visible on touch devices */}
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

      {/* Optional: Add a subtle overlay when not interacting */}
      <div className="absolute inset-0 pointer-events-none group-hover:bg-black/[0.02] transition-colors"></div>
    </motion.div>
  );
}

