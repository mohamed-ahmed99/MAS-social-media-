import { FaUserTag, FaImage, FaVideo } from "react-icons/fa";

export default function PostActionsList({ onToggleMedia, activeType }) {

  const buttons = [
    {
      id: "image",
      icon: <FaImage size={20} />,
      text: "Photo",
      activeColor: "text-green-600",
      activeBg: "bg-green-50",
      defaultColor: "text-gray-600"
    },
    {
      id: "video",
      icon: <FaVideo size={20} />,
      text: "Video",
      activeColor: "text-red-600",
      activeBg: "bg-red-50",
      defaultColor: "text-gray-600"
    },
    {
      id: "tag",
      icon: <FaUserTag size={20} />,
      text: "Tag",
      activeColor: "text-blue-600",
      activeBg: "bg-blue-50",
      defaultColor: "text-gray-600"
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
                ? `${button.activeBg} ${button.activeColor} ring-1 ring-inset ring-current/20` 
                : `hover:bg-gray-50 ${button.defaultColor}`
            }`}
            title={button.text}
          >
            {button.icon}
            <span className={`hidden sm:inline text-xs font-bold ${isActive ? button.activeColor : 'text-gray-600'}`}>
              {button.text}
            </span>
          </button>
         );
       })}
      </div>
    </div>
  );
}
