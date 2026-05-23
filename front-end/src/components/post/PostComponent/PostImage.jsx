
export default function PostImage({ url }) {
  return (
    <img 
      src={url} 
      alt="post" 
      className="w-full cursor-pointer max-h-[400px] 500:max-h-[500px] lg:max-h-[600px] xl:max-h-[450px] 2xl:max-h-[600px] object-cover"
    />
  );
}
