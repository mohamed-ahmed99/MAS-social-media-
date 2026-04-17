import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlobalData } from '../../hooks/useStore.jsx'
import GeneralBtn from '../btns/GeneralBtn.jsx'
import { PuffLoader } from 'react-spinners'

// components
import PostHeader from './PostHeader.jsx';
import PostUserInfo from './PostUserInfo.jsx';
import PostImageDisplay from './PostImageDisplay.jsx';
import PostVideoDisplay from './PostVideoDisplay.jsx';
import PostActionsList from './PostActionsList.jsx';


import { useGetMethod } from '../../hooks/useGetMethod.js';



export default function CreatePostAlert({ setCreatePost }) {
  // get method
  const { getData, status_g, data_g, loading_g} = useGetMethod();

  // refs
  const textRef = useRef(null);

  //  user data
  const [user] = useGlobalData("user");
  
  // states
  const [selectionBtn, setSelectionBtn] = useState("public"); // public, friends or only me
  const [validation, setValidation] = useState(""); // validation message
  const [loading, setIsLoading] = useState(false); // loading state
  const [showMediaInput, setShowMediaInput] = useState(false); // show media input
  const [mediaUrl, setMediaUrl] = useState(""); // media url
  const [mediaType, setMediaType] = useState("image"); // image or video


  // prevent scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [])

  // hiding validation after 5s
  useEffect(() => {
    if (validation) {
      const timer = setTimeout(() => {
        setValidation("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [validation]);

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
        className='bg-white w-full h-full sm:h-[500px] sm:max-w-[700px] sm:rounded-2xl border border-gray-100 shadow-2xl flex flex-col overflow-y-auto'
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

            {/* media input */}
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
                    placeholder={mediaType === "image" ? "Paste photo URL here..." : "Paste video or YouTube URL here..."}
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-black transition-colors text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* media display */}
            <AnimatePresence mode='wait'>
              {mediaUrl && (
                mediaType === "image" ? (
                  <PostImageDisplay 
                    url={mediaUrl} 
                    onClear={() => setMediaUrl("")} 
                  />
                ) : (
                  <PostVideoDisplay 
                    url={mediaUrl} 
                    onClear={() => setMediaUrl("")} 
                  />
                )
              )}
            </AnimatePresence>
            </div>
          
          {/* post actions list */}
          <PostActionsList 
            activeType={showMediaInput ? mediaType : null}
            onToggleMedia={(type) => {
              if (showMediaInput && mediaType === type) {
                setShowMediaInput(false);
              } else {
                setShowMediaInput(true);
                setMediaType(type);
              }
            }} 
          />

          {/* validation */}
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

          {/* post button */}
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
