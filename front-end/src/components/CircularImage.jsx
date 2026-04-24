
export default function CircularImage({
  src,
  alt="photo",
  firstName="U",
  fontSize=20,
  className,
}) {
  return (
    <div className={`bg-gray-300 w-full h-full overflow-hidden flex ${
      className || ""
    }`}>

      {src ? (
        <img  
            src={src} 
            alt={alt} 
            className="object-cover w-full h-full"
        />
      ) : (
        <div 
          className={`bg-gray-200 w-full h-full border-[1.5px] border-gray-400 flex items-center justify-center ${
            className || ""
          }`}
        >
          <p 
            style={{fontSize:fontSize}}
            className="tracking-wide font-bold capitalize">
              {firstName.charAt(0)}
          </p>
        </div>
      )}
    </div>
  )
}
