import { useRef, useState } from 'react'
import { useEffect } from 'react'
import CircularImage from '../../components/CircularImage.jsx';
import {motion, AnimatePresence} from 'framer-motion'
import ButtonList from './ButtonList.jsx';
import {PuffLoader } from 'react-spinners'
import { addPost } from './addPost.js';
import Alert from '../Alert.jsx'

// icons
import { IoMdPhotos } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaUserTag } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function CreatePostAlert({setCreatePost}) {
  const textRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [])

  
  
  // get type of post "public" , "freinds" or "only me"
  const [selectionBtn, setSelectionBtn] = useState("public")
  

  // validation message
  const [validation, setValidation] = useState("")
  const [loading, setIsLoading] = useState(false);


  const handlePost = async () => {
    if(!textRef.current?.value) {
      setValidation("no content to post")
      return;
    }
    else setValidation("")

    // proceed to post creation
    const response = await addPost(textRef.current?.value, selectionBtn, setIsLoading);
    if(response.success){
      closeBtnRef.current.click();
    }
    console.log(response);
  }


  // message of validation
  useEffect(() => {
    if(validation) setTimeout(() => setValidation(""), 5000);
  },[validation])

  return (
    <AnimatePresence>
      <div 
        onClick={() => setCreatePost(false)}
        className="absolute top-0 left-0 -translate-y-[100px] lg:-translate-y-[80px] h-[calc(100vh+200px)] lg:h-[calc(100vh+80px)] w-full bg-white/70 flex items-center justify-center z-[9999]"
        >
          
          <motion.div 
            onClick={(e) => e.stopPropagation() }
            initial={{scale:window.innerWidth > 900? 0.5 : 1, opacity:0, y: window.innerWidth > 900? 0: 300}}
            animate={{scale:1, opacity:1, y:0}}
            exit={{scale:0.8, opacity:0, y:200}}
            transition={{duration:0.4}}
            className='lg:-translate-y-10 shadow-xl h-screen lg:h-[400px] overflow-y-scroll shadow-black/50 bg-white rounded-lg p-2 sm:p-4 border-[1.5px] border-gray-300 max-w-full lg:max-w-[800px] w-full lg:mx-2'
          >
            {/* loading */}
            {loading &&  <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10'>
                      <PuffLoader color="#000" size={100}/>
            </div>}


              
              {/* top */}
              <div className='flex relative'>
                  <h2 className="text-xl font-semibold mb-2 text-center w-full">Create Post</h2>

                  <button 
                    ref={closeBtnRef}
                    onClick={() => setCreatePost(false)}
                    className='absolute top-1/3 -translate-y-1/2 right-2 bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition-colors'>
                      <IoClose fontSize={25}/>
                  </button>
              </div>

              {/* user info */}
              <div className='flex items-center gap-2 mt-4'>
                  <CircularImage src={'/user.jpg'} size={50} firstName="Mohamed" lastName="Ahmed"/>
                  <div>
                      <h3 className="font-semibold">Mohamed Ahmed</h3>
                      <ButtonList setSelectionBtn={setSelectionBtn}/>
                  </div>
              </div>

              {/* post content */}
              <div className='mt-4'>
                  <textarea 
                    ref={textRef}
                    placeholder="What's on your mind, Mohamed?"
                    className='w-full min-h-[80px] sm:min-h-[130px] resize-none outline-none border-none text-sm sm:text-lg ' 
                  ></textarea>

                  
              </div>

              {/* add to your post */}
              <div className='mt-4 flex items-center justify-between'>
                  <h4 className='font-semibold mb-2'>Add to your post</h4>
                  
                  <div className='flex gap-3'>

                      <button className='bg-green-100 text-green-600 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors'>
                          <FaUserTag className='block sm:hidden'/>
                          <span className='hidden sm:block'>Tag Friends</span>
                          
                      </button>
                  </div>
              </div>

              {/* data handling message*/}
              <AnimatePresence>
                {validation && 
                <motion.p
                  initial={{scale:0}}
                  animate={{scale:1}}
                  exit={{scale:0}}
                  transition={{duration:.3}}
                  className='text-center text-red-600 mt-2'
                > {validation}
                </motion.p>
                } 
              </AnimatePresence>


              {/* post button */}
              <button 
                onClick={() => handlePost()}
                className='mt-2 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
                  Post
              </button>
          </motion.div>
      </div>

      
    </AnimatePresence>
  )
}
  

