import { useRef } from 'react';

export const useReactionPickerEvents = (setIsHovered) => {
  const longPressTimer = useRef(null);
  const isLongPress = useRef(false);

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

  return {
    isLongPress,
    handlers: {
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove,
    }
  };
};
