import { reactionsData } from "./reactionsData.jsx";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import ReactionPicker from "./reactionPicker/ReactionPicker";


export default function Reactions({postId, setOpenComments, postReactions, setPostReactions }) {

    // filter reactions
    const reactionTypes = postReactions?.topReactions?.map(reaction => reaction.reaction)

    return (
        <div className="flex xl:hidden justify-between pt-1 px-1 sm:px-4">
            <div className="flex items-center gap-3">

                {/* like */}
                <div className="flex items-center">
                    <ReactionPicker 
                        postId={postId}
                        setPostReactions={setPostReactions}
                        postReactions={postReactions}
                    />
                    {/* total count */}
                    <p>{postReactions?.totalCount}</p>  
                </div>

                {/* comment */}
                <div
                    onClick={() => setOpenComments(prev => !prev)}
                    className="flex items-center"
                >
                    <button className="hover:bg-gray-200 px-2 py-1 rounded-md"> <FaRegComment fontSize={19} /> </button>
                    <p>{ 0}</p>
                </div>
                <div className="flex items-center">
                    <button className="hover:bg-gray-200 px-2 py-1 rounded-md"> <PiShareFat fontSize={22} /> </button>
                    <p>{ 0}</p>
                </div>
            </div>


            {/* most used reactions*/}
            <div className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-200 px-3 py-2">
                {postReactions?.topReactions?.length > 0 &&
                    <div className="flex items-center justify-between">
                        {reactionTypes.map((reaction, index) => {
                            return (
                                <div key={index}>{reactionsData.find((r) => r.id === reaction)?.icon}</div>
                            )
                        })}
                    </div>}
            </div>
        </div>
    )
}