import PostImage from './PostImage.jsx';
import PostVideo from './PostVideo.jsx';

export default function File({fileUrl, fileType, setFullScreen}) {
    console.log(fileUrl, fileType);
  return (
    <div className="mt-2">
        {fileType === "image" && (
            <PostImage url={fileUrl} setFullScreen={setFullScreen} />
        )}
        {fileType === "video" && (
            <PostVideo url={fileUrl} />
        )}
    </div>
  )
}
