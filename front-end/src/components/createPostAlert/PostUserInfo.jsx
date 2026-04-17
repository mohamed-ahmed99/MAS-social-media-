import CircularImage from '../CircularImage.jsx';
import ButtonList from './ButtonList.jsx';

export default function PostUserInfo({ user, setSelectionBtn }) {
  return (
    <div className='flex items-center gap-3 mb-4'>

      {/* profile picture */}
      <div className='w-11 h-11 border border-gray-200 rounded-full p-[2px]'>
        <CircularImage 
          src={user?.profilePicture || "/user.jpg"} 
          firstName={user?.userName || "User"} 
        />
      </div>

      {/* user name and button list */}
      <div>
        <h3 className="font-semibold text-zinc-800 leading-none mb-1">{user?.userName || "User"}</h3>
        <ButtonList setSelectionBtn={setSelectionBtn} />
      </div>
    </div>
  );
}
