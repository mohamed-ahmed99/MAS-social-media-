import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlobalData } from '../../hooks/useStore.jsx'
import GeneralBtn from '../btns/GeneralBtn.jsx'
import { PuffLoader } from 'react-spinners'

// components
import { addPost } from './addPost.js';
import PostHeader from './PostHeader.jsx';
import PostUserInfo from './PostUserInfo.jsx';
import PostMediaDisplay from './PostMediaDisplay.jsx';
import PostActionsList from './PostActionsList.jsx';

export default function CreatePostAlert({ setCreatePost }) {
  // refs
  const textRef = useRef(null);

  // states
  const [user] = useGlobalData("user");
  const [selectionBtn, setSelectionBtn] = useState("public");
  const [validation, setValidation] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");

  // prevent scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [])

  const handlePost = async () => {
    const text = textRef.current.value.trim();

    if (!text && !mediaUrl) {
      setValidation("Please enter some text or a media link");
      return;
    }

    setValidation("");
    const result = await addPost(text, selectionBtn, mediaUrl, setIsLoading);

    if (result.success) {
      setCreatePost(false);
      window.location.reload();
    } else {
      setValidation(result.message || "Something went wrong");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4 bg-white/80 backdrop-blur-md"
      onClick={() => setCreatePost(false)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className='bg-white w-full h-full sm:h-[500px] sm:max-w-[550px] sm:rounded-2xl border border-gray-100 shadow-2xl flex flex-col overflow-auth'
      >
        <div className="flex flex-col h-full p-4 sm:p-5">

          {/* header */}
          <PostHeader onClose={() => setCreatePost(false)} />

          <div className="flex-grow overflow-y-auto pr-1 flex flex-col">

            {/* user info */}
            <PostUserInfo user={user} setSelectionBtn={setSelectionBtn} />

            {/* text area */}
            <textarea
              ref={textRef}
              placeholder={`What's on your mind, ${user?.userName?.split(" ")[0]}?`}
              className='w-full resize-none outline-none border-none text-lg text-zinc-800 placeholder-gray-400 transition-all duration-300 flex-grow sm:flex-none min-h-[120px] sm:h-[150px]'
            ></textarea>

            <AnimatePresence>
              {showMediaInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-4"
                >
                  <input
                    type="text"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="Paste image or video URL here..."
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-black transition-colors text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            
          </div>

          <PostActionsList onToggleMedia={() => setShowMediaInput(!showMediaInput)} />

          <AnimatePresence>
            {validation && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center text-red-500 text-xs mt-3 font-semibold'
              >
                {validation}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-4">
            <GeneralBtn
              text="Post"
              onClick={handlePost}
              loading={loading}
              loadingIcon={<PuffLoader color="#fff" size={20} />}
              variant="black"
              className='w-full rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-black/5 hover:scale-[1.02] active:scale-95 transition-all'
            />
          </div>

        </div>
      </motion.div>
    </div>
  );
}
