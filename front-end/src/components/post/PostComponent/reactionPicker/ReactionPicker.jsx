import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingReactionBar from './FloatingReactionBar';
import Button from "./Button.jsx"
import { usePostMethod } from "../../../../hooks/usePostMethod.js"
import { useDeleteMethod } from "../../../../hooks/useDeleteMethod.js"
import { updateReactionState } from "./updateReactionState.js"
import { useReactionPickerEvents } from "./useReactionPickerEvents.js"
import { reactionsData } from "../reactionsData.jsx";



const ReactionPicker = ({
  className = "",
  postId,
  postReactions,
  setPostReactions,
}) => {

  // my hooks
  const { postData, loading_p, status_p } = usePostMethod()
  const { deleteData, status_d, loading_d } = useDeleteMethod()

  // 
  const [selectedReaction, setSelectedReaction] = useState(() => {
    return (postReactions?.myReaction && postReactions.myReaction !== "None")
      ? reactionsData.find(r => r.id === postReactions.myReaction)
      : null;
  });

  useEffect(() => {
    if (postReactions?.myReaction && postReactions.myReaction !== "None") {
      setSelectedReaction(reactionsData.find(r => r.id === postReactions.myReaction) || null);
    } else {
      setSelectedReaction(null);
    }
  }, [postReactions?.myReaction]);

  // 
  const [isHovered, setIsHovered] = useState(false);
  const { isLongPress, handlers } = useReactionPickerEvents(setIsHovered);

  // Toggle selection or select new one
  const handleSelect = async (reaction) => {
    // close ReactionPicker
    setIsHovered(false);

    const oldReactionId = selectedReaction?.id;

    if (oldReactionId === reaction.id) {
      // remove reaction
      await deleteData(`/api/reactions/${postId}/inactivate`)
      setSelectedReaction(null);
      updateReactionState(setPostReactions, oldReactionId, null);
    } else {
      // create reaction
      await postData(`/api/reactions/create/${postId}`, {}, { reaction: reaction.id })
      // update selectedReaction
      setSelectedReaction(reaction);
      updateReactionState(setPostReactions, oldReactionId, reaction.id);
    }
  };

  // Main button click (default to like or toggle off)
  const handleMainClick = async (e) => {
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }

    e.stopPropagation();
    setIsHovered(false); // Close picker on click

    if (selectedReaction) {
      // remove reaction
      const oldReactionId = selectedReaction.id;
      const response = await deleteData(`/api/reactions/${postId}/inactivate`)
      console.log(response)
      if (response.success === "success") {
        setSelectedReaction(null);
        updateReactionState(setPostReactions, oldReactionId, null);
      }
    } else {
      await postData(`/api/reactions/create/${postId}`, {}, { reaction: reactionsData[0].id })
      setSelectedReaction(reactionsData[0]); // Default to Like
      updateReactionState(setPostReactions, null, reactionsData[0].id);
    }
  };


  return (
    <div
      className={`relative inline-block ${className}`}
      {...handlers}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Floating Reactions Bar */}
      <AnimatePresence>
        {isHovered && (
          <FloatingReactionBar
            reactions={reactionsData}
            handleSelect={handleSelect}
          />
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <Button
        handleMainClick={handleMainClick}
        selectedReaction={selectedReaction}
        loading={loading_p || loading_d}
        reactionsData={reactionsData}
      />

    </div>
  );
};



export default ReactionPicker;
