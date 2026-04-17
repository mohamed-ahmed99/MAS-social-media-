import { FaUserTag, FaImage, FaVideo } from "react-icons/fa";

export default function PostActionsList({ onToggleMedia, activeType }) {

  const buttons = [
    {
      id: "image",
      icon: <FaImage size={20} />,
      text: "Photo",
    },
    {
      id: "video",
      icon: <FaVideo size={20} />,
      text: "Video",
    },
    {
      id: "tag",
      icon: <FaUserTag size={20} />,
      text: "Tag",
    },
  ];

  return (
    <div className='flex items-center justify-between px-3 py-1.5 border rounded-xl border-gray-100 bg-white mt-4'>
      <span className='font-semibold text-sm text-zinc-800 ml-1'>Add to your post</span>
      
      <div className='flex items-center gap-1'>
       {buttons.map((button) => {
         const isActive = activeType === button.id;
         return (
          <button 
            key={button.id}
            onClick={() => button.id !== 'tag' && onToggleMedia(button.id)}
            className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              isActive 
                ? `bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200` 
                : `hover:bg-gray-50 text-gray-400`
            }`}
            title={button.text}
          >
            {button.icon}
            <span className={`hidden sm:inline text-xs font-bold ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
              {button.text}
            </span>
          </button>
         );
       })}
      </div>
    </div>
  );
}
