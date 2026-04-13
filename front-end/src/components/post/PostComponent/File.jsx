

export default function File({fileUrl, fileType, setFullScreen}) {
  return (
    <div className="mt-2">
        {fileType === "image" && (
            <img 
                src={fileUrl} 
                alt="post" 
                onClick={() => setFullScreen(true)}
                className="w-full max-h-[400px] 500:max-h-[500px]  lg:max-h-[600px] xl:max-h-[450px] 2xl:max-h-[600px] object-cover"
            />
        )}
        {fileType === "video" && (
            <video 
                src={fileUrl} 
                alt="post" 
                controls
                className="w-full max-h-[400px] 500:max-h-[500px]  lg:max-h-[600px] xl:max-h-[450px] 2xl:max-h-[600px] object-cover"
            />
        )}
    </div>
  )
}