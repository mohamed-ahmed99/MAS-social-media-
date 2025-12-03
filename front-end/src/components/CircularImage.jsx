
export default function CircularImage({src, alt, size = 50}) {
  return (
    <div className="bg-black w-fit h-fit rounded-full overflow-hidden">

        <img  
            src={src} alt={alt} width={size} height={size}
            className="rounded-full object-cover"
        />
    </div>
  )
}
