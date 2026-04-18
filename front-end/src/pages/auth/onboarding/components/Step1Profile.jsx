import { useOutletContext } from 'react-router-dom';
import { HiOutlinePhotograph, HiLink } from 'react-icons/hi';

const Step1Profile = () => {
  // context
  const { formData, updateFormData, avatars, covers } = useOutletContext();

  // return
  return (
    <div className="space-y-10">
      {/* header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">Setup your profile</h2>
        <p className="text-gray-500 text-sm md:text-base">Choose a profile picture from our presets to get started or put a link to an image.</p>
      </div>

      {/* Profile Picture */}
      <section>
        <label className="block text-xs font-black text-gray-400 mb-5 uppercase tracking-[0.2em]">
          Profile Picture
        </label>

        {/* avatars */}
        <div className="flex flex-wrap gap-5 mb-8">
          {avatars.map((avatar, idx) => (
            <button
              key={idx}
              onClick={() => updateFormData({ profileImage: avatar })}
              className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                formData.profileImage === avatar 
                ? 'border-black scale-110 shadow-lg ring-4 ring-gray-100' 
                : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img src={avatar} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* upload image */}
        <div className="relative">
          <HiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Image URL..."
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition-all text-sm font-medium"
            value={formData.profileImage.startsWith('http') && !avatars.includes(formData.profileImage) ? formData.profileImage : ''}
            onChange={(e) => updateFormData({ profileImage: e.target.value })}
          />
        </div>
      </section>

      {/* Cover Photo */}
      <section>
        <label className="block text-xs font-black text-gray-400 mb-5 uppercase tracking-[0.2em]">
          Cover Photo
        </label>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {covers.map((cover, idx) => (
            <button
              key={idx}
              onClick={() => updateFormData({ coverImage: cover })}
              className={`h-24 rounded-xl overflow-hidden border-2 transition-all ${
                formData.coverImage === cover 
                ? 'border-black shadow-md ring-4 ring-gray-100' 
                : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={cover} alt={`Cover ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="relative">
          <HiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cover URL..."
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition-all text-sm font-medium"
            value={formData.coverImage.startsWith('http') && !covers.includes(formData.coverImage) ? formData.coverImage : ''}
            onChange={(e) => updateFormData({ coverImage: e.target.value })}
          />
        </div>
      </section>
    </div>
  );
};

export default Step1Profile;
