import PostImage from './PostImage.jsx';
import PostVideo from './PostVideo.jsx';

export default function File({fileUrl, fileType}) {
  return (
    <div className="mt-2">
        {fileType === "image" && (
            <PostImage url={fileUrl} />
        )}
        {fileType === "video" && (
            <PostVideo url={fileUrl} />
        )}
    </div>
  )
}
