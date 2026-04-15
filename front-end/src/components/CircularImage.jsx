
export default function CircularImage({
  src,
  alt="photo",
  firstName="U",
  fontSize=20,
  }) {
  return (
    <div className="bg-black w-fit h-fit w-full h-full rounded-full overflow-hidden">

      {src ? (
        <img  
            src={src} 
            alt={alt} 
            className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <div 
          className="bg-gray-200 w-full h-full rounded-full border-[1.5px] border-gray-400 flex items-center justify-center"
        >
          <span 
            style={{fontSize:fontSize}}
            className="tracking-wide font-bold capitalize text-black/85">
              {firstName.charAt(0)}
          </span>
        </div>
      )}
    </div>
  )
}
