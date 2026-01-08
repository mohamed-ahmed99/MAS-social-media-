
export default function CircularImage({src, alt="user photo", size = 50, firstName="U", lastName=""}) {
  return (
    <div className="bg-black w-fit h-fit rounded-full overflow-hidden">

      {src ? (
        <img  
            src={src} alt={alt} width={size} height={size}
            className="rounded-full object-cover"
        />
      ) : (
        <div className="bg-gray-200 rounded-full border-[1.5px] border-gray-400 w-8 h-8 flex items-center justify-center">
          <span className="text-xs font-bold capitalize">{firstName.charAt(0)}{lastName.charAt(0)}</span>
        </div>
      )}
    </div>
  )
}
