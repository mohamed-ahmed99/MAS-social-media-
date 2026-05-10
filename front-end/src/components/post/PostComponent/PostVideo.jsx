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
        let videoId = '';
        if (parsedUrl.hostname.includes('youtu.be')) {
          videoId = parsedUrl.pathname.slice(1);
        } else {
          videoId = parsedUrl.searchParams.get('v');
        }
        
        if (videoId) {
          const origin = typeof window !== 'undefined' ? window.location.origin : '';
          setEmbedUrl(`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${origin}&widget_referrer=${origin}`);
          setVideoPlatform('youtube');
          setIsNativeVideo(false);
        } else {
          // Fallback to original URL if no ID found
          setEmbedUrl(url);
          setVideoPlatform('native');
          setIsNativeVideo(true);
        }
      } 
      // 
      else if (parsedUrl.hostname.includes('vimeo.com')) {
        const videoId = parsedUrl.pathname.split('/').pop();
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        setEmbedUrl(`https://player.vimeo.com/video/${videoId}?api=1&origin=${origin}`);
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

  const wasVisible = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wasVisible.current = true;
          } else {
            // Only pause if it was previously visible to avoid sending commands to loading off-screen iframes
            if (wasVisible.current) {
              if (isNativeVideo && videoRef.current) {
                videoRef.current.pause();
              } 
              else if (!isNativeVideo && iframeRef.current && iframeRef.current.contentWindow) {
                 try {
                     if (videoPlatform === 'youtube') {
                         iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
                     } 
                     else if (videoPlatform === 'vimeo') {
                         iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
                     }
                 } catch (error) {
                     console.log("Could not pause iframe video", error);
                 }
              }
            }
          }
        });
      },
      { threshold: 0.1 }
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
      {embedUrl && (
        isNativeVideo ? (
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
        )
      )}
    </div>
  );
}
