import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalData } from '../../../../hooks/useStore';

const ProfilePreview = ({ formData }) => {
  const { profileImage, coverImage, bio } = formData;
  const [user] = useGlobalData('user');
  console.log(user?.userName);

  const renderProfileImage = () => {
    if (profileImage) {
      return (
        <img 
          src={profileImage} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <div className="w-full h-full bg-black flex items-center justify-center text-white text-3xl font-black">
        {user?.userName?.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-sm border border-gray-100"
    >
      {/* Cover Photo Area */}
      <div className="relative h-44 w-full bg-gray-100">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        
        {/* Profile Image - Overlapping */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <div className="w-28 h-28 rounded-full border-8 border-white shadow-xl overflow-hidden bg-white">
            {renderProfileImage()}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-16 pb-12 px-8 text-center">

        
      </div>
    </motion.div>
  );
};

export default ProfilePreview;
