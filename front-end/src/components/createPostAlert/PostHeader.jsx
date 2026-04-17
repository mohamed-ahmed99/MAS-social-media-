import { IoClose } from "react-icons/io5";

export default function PostHeader({ onClose }) {
  return (
    <div className='flex items-center justify-between pb-3 border-b border-gray-100 mb-4'>
      
      {/* empty div for spacing */}
      <div className="w-8"></div>
      
      {/* title */}
      <h2 className="text-lg font-bold text-zinc-800 uppercase tracking-wider">Create Post</h2>
      
      {/* close button */}
      <button 
        onClick={onClose}
        className='p-1.5 rounded-full hover:bg-zinc-800 hover:text-white transition-all duration-200 text-gray-600'
      >
        <IoClose size={24}/>
      </button>
    </div>
  );
}
