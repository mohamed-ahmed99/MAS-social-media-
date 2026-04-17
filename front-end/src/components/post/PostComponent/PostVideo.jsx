
export default function PostVideo({ url }) {

  // get embed url
  const getEmbedUrl = (url) => {
    try {
      // parse url
      const parsedUrl = new URL(url);

      // check if youtube
      if (parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be')) {
        let videoId = parsedUrl.hostname.includes('youtu.be')
          ? parsedUrl.pathname.slice(1)
          : parsedUrl.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // check if vimeo
      if (parsedUrl.hostname.includes('vimeo.com')) {
        const videoId = parsedUrl.pathname.slice(1);
        return `https://player.vimeo.com/video/${videoId}`;
      }

      // return original url if not youtube or vimeo
      return url;
    } catch (e) {
      return url;
    }
  };

  // return video
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-100">
      <iframe
        src={getEmbedUrl(url)}
        title="post-video"
        className="w-full h-full border-none"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}
