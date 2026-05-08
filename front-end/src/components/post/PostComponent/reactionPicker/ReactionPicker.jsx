import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import FloatingReactionBar from './FloatingReactionBar';
import Button from "./Button.jsx"


// reaction data
const reactions = [
  { 
    id: 'like', 
    icon: <AiFillLike color="#3b82f6" fontSize={22} />, 
    label: 'Like', 
    color: 'text-blue-500',
    emoji: "👍"
  },
  { 
    id: 'love', 
    icon: <FaHeart color="#ef4444" fontSize={20} />, 
    label: 'Love', 
    color: 'text-red-500',
    emoji: "❤️"
  },
  { 
    id: 'haha', 
    icon: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f602.png" alt="haha" className="w-6 h-6 object-contain" />, 
    label: 'Haha', 
    color: 'text-yellow-500',
    emoji: "😂"
  },
  { 
    id: 'wow', 
    icon: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f62e.png" alt="wow" className="w-6 h-6 object-contain" />, 
    label: 'Wow', 
    color: 'text-yellow-500',
    emoji: "😮"
  },
  { 
    id: 'sad', 
    icon: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f622.png" alt="sad" className="w-6 h-6 object-contain" />, 
    label: 'Sad', 
    color: 'text-yellow-500',
    emoji: "😢"
  },
  { 
    id: 'angry', 
    icon: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f621.png" alt="angry" className="w-6 h-6 object-contain" />, 
    label: 'Angry', 
    color: 'text-orange-600',
    emoji: "😡"
  },
];



const ReactionPicker = ({ className = "" }) => {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const longPressTimer = React.useRef(null);
  const isLongPress = React.useRef(false);

  // Toggle selection or select new one
  const handleSelect = (reaction) => {
    if (selectedReaction?.id === reaction.id) {
      setSelectedReaction(null);
    } else {
      setSelectedReaction(reaction);
    }
    setIsHovered(false);
  };

  // Main button click (default to like or toggle off)
  const handleMainClick = (e) => {
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    
    e.stopPropagation();
    if (selectedReaction) {
      setSelectedReaction(null);
    } else {
      setSelectedReaction(reactions[0]); // Default to Like
    }
  };

  // Mobile Long Press Handlers
  const handleTouchStart = () => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      setIsHovered(true);
      isLongPress.current = true;
    }, 500); // 500ms long press
  };

  // stop the long press timer
  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };


  // stop the long press timer when the touch moves
  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  // Desktop Hover Handler
  const handlePointerEnter = (e) => {
    if (e.pointerType === 'mouse') {
      setIsHovered(true);
    }
  };

  // Desktop Leave Handler
  const handlePointerLeave = (e) => {
    if (e.pointerType === 'mouse') {
      setIsHovered(false);
    }
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Floating Reactions Bar */}
      <AnimatePresence>
        {isHovered && (
          <FloatingReactionBar 
            reactions={reactions}
            handleSelect={handleSelect}
          />
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <Button
        handleMainClick={handleMainClick}
        selectedReaction={selectedReaction}
      />
      
    </div>
  );
};



export default ReactionPicker;
