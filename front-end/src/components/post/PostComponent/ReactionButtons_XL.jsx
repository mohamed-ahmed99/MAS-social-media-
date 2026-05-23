
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import ReactionPicker from './reactionPicker/ReactionPicker';


export default function ReactionButtons_XL({ 
  setOpenComments, 
  postId, 
  setPostReactions, 
  postReactions, 
  TextToIcon
}) {

  return (
    <div className="hidden xl:flex items-center justify-between px-10 ">
      <ReactionPicker 
        postId={postId}
        setPostReactions={setPostReactions}
        postReactions={postReactions}
        TextToIcon={TextToIcon}
      />


      <button
        onClick={() => setOpenComments(prev => !prev)}
        className="hover:bg-gray-200 px-10 py-1 rounded-md"> <FaRegComment fontSize={19} />
      </button>
      <button className="hover:bg-gray-200 px-10 py-1 rounded-md"> <PiShareFat fontSize={22} /> </button>
    </div>
  )
}