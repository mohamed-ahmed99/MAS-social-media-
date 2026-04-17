import { FaUserTag, FaPhotoVideo } from "react-icons/fa";
import { MdLink } from "react-icons/md";

export default function PostActionsList({ onToggleMedia }) {


  const buttons = [
    {
      icon: <FaPhotoVideo size={20} className="text-gray-600"/>,
      text: "Media URL",
      onClick: onToggleMedia,
    },
    {
      icon: <FaUserTag size={20} className="text-gray-600"/>,
      text: "Tag",
      onClick: () => {},
    },
  ];




  return (
    <div className='flex items-center justify-between px-3 py-1  border rounded-xl border-gray-100 bg-white mt-4'>
      <span className='font-semibold text-sm text-zinc-800 ml-1'>Add to your post</span>
      
      <div className='flex items-center gap-1'>
       {buttons.map((button, index) => (
        <button 
          key={index}
          onClick={button.onClick}
          className='p-2 hover:bg-gray-100 rounded-lg text-black transition-colors flex items-center gap-2'
          title={button.text}
        >
          {button.icon}
          <span className="hidden sm:inline text-xs font-semibold text-gray-600">{button.text}</span>
        </button>
       ))}
      </div>
    </div>
  );
}
