import { useEffect, useRef, useState } from 'react';

export default function PostVideo({ url }) {
  // Refs
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const videoRef = useRef(null);
  
  // States
  const [isNativeVideo, setIsNativeVideo] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const [videoPlatform, setVideoPlatform] = useState(''); // 'youtube', 'vimeo', or 'native'

  // Check video type
  useEffect(() => {
    if (!url) return;
    
    try {
      const parsedUrl = new URL(url);

      // 
      if (parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be')) {
        let videoId = parsedUrl.hostname.includes('youtu.be')
          ? parsedUrl.pathname.slice(1)
          : parsedUrl.searchParams.get('v');
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}?enablejsapi=1`);
        setVideoPlatform('youtube');
        setIsNativeVideo(false);
      } 
      // 
      else if (parsedUrl.hostname.includes('vimeo.com')) {
        const videoId = parsedUrl.pathname.slice(1);
        setEmbedUrl(`https://player.vimeo.com/video/${videoId}?api=1`);
        setVideoPlatform('vimeo');
        setIsNativeVideo(false);
      } 
      
      // 
      else {
        // Assume native video (mp4, webm, cloudinary, etc)
        setEmbedUrl(url);
        setVideoPlatform('native');
        setIsNativeVideo(true);
      }
    } 
    // 
    catch (e) {
      setEmbedUrl(url);
      setVideoPlatform('native');
      setIsNativeVideo(true);
    }
  }, [url]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Pause video when out of view
            if (isNativeVideo && videoRef.current) {
              videoRef.current.pause();
            } 
            // Pause iframe video when out of view
            else if (!isNativeVideo && iframeRef.current) {
               try {
                   // Pause youtube video when out of view
                   if (videoPlatform === 'youtube') {
                       iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
                   } 
                   // Pause vimeo video when out of view
                   else if (videoPlatform === 'vimeo') {
                       iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
                   }
               } catch (error) {
                   console.log("Could not pause iframe video", error);
               }
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 90% out of view
    );

    if (containerRef.current) {
        observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isNativeVideo, videoPlatform]);


  // Render video
  return (
    <div ref={containerRef} className="w-full aspect-video overflow-hidden border border-gray-100 bg-black">
      {isNativeVideo ? (
        <video
          ref={videoRef}
          src={embedUrl}
          className="w-full h-full"
          controls
          controlsList="nodownload"
        />
      ) : (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title="post-video"
          className="w-full h-full border-none"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}
    </div>
  );
}
