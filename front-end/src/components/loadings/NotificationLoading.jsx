import React from "react";

export default function NotificationLoading() {
  return (
    <div className="flex items-start gap-1 p-3 animate-pulse">
      
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300" />

      <div className="flex-1 space-y-2">

        <div className="h-3 w-[90%] bg-gray-300 rounded" />
        
        <div className="h-3 w-[70%] bg-gray-300 rounded" />

        <div className="h-2 w-[40%] bg-gray-300 rounded" />
      </div>
    </div>
  );
}
