import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { HiOutlineChatAlt2 } from 'react-icons/hi';

const Step2Bio = () => {
  const { formData, updateFormData } = useOutletContext();
  const charLimit = 150;

  return (
    <div className="space-y-10">

      {/* //////////////////// header //////////////////// */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">Add a short bio</h2>
        <p className="text-gray-500 text-sm md:text-base">Write a short description about yourself. Let others know who you are.</p>
      </div>

      {/*////////////////// bio input ////////////////////*/}
      <div className="relative group">

        {/* icon */}
        <div className="absolute top-5 left-5 p-2 bg-gray-100 rounded-lg group-focus-within:bg-black transition-colors">
          <HiOutlineChatAlt2 className="text-gray-600 group-focus-within:text-white text-xl" />
        </div>

        {/* textarea */}
        <textarea
          rows="6"
          placeholder="Write a short description about yourself. Let others know who you are."
          className="w-full pl-16 pr-5 py-6 bg-gray-50 border border-gray-200 rounded-2xl focus:border-black outline-none transition-all text-base md:text-lg font-medium resize-none placeholder:text-gray-300"
          value={formData.bio}
          maxLength={charLimit}
          onChange={(e) => updateFormData({ bio: e.target.value })}
        />

        {/*////////////////// character count ////////////////////*/}
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                formData.bio.length > charLimit * 0.8 ? 'bg-black' : 'bg-gray-400'
              }`} 
              style={{ width: `${(formData.bio.length / charLimit) * 100}%` }} 
            />
          </div>
          <span className="text-xs font-black text-gray-400 tabular-nums">
            {formData.bio.length}/{charLimit}
          </span>
        </div>
      </div>

    </div>
  );
};

export default Step2Bio;
