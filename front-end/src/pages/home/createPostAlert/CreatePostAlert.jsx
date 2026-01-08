import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import CircularImage from '../../../components/CircularImage.jsx';
import {motion, AnimatePresence} from 'framer-motion'
import ButtonList from './ButtonList.jsx';

export default function CreatePostAlert({setCreatePost}) {
  const getImage = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [])

  const [data, setData] = useState({img:""})
  console.log(data)


  // get type of post "public" , "freinds" or "only me"
  const [selectionBtn, setSelectionBtn] = useState("public")
  useEffect(() => console.log(selectionBtn), [selectionBtn])

  const handleAddImage = () => {
    getImage.current.click();
  };


  return (
    <AnimatePresence>
      <div className="absolute top-0 left-0 -translate-y-[100px] lg:-translate-y-[80px] h-[calc(100vh+200px)] lg:h-[calc(100vh+80px)] w-full bg-white/70 flex items-center justify-center z-[9999]">
          
          <motion.div 
            initial={{scale:0.8, opacity:0, y:200}}
            animate={{scale:1, opacity:1, y:0}}
            exit={{scale:0.8, opacity:0, y:200}}
            transition={{duration:0.3}}
            className='lg:-translate-y-10 shadow-xl h-screen lg:h-auto shadow-black/50 bg-white rounded-lg p-4 border-[1.5px] border-gray-300 max-w-full lg:max-w-[600px] w-full lg:mx-2'
          >
              
              {/* top */}
              <div className='flex relative'>
                  <h2 className="text-xl font-semibold mb-2 text-center w-full">Create Post</h2>

                  <button 
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
                    placeholder="What's on your mind, Mohamed?"
                    className='w-full min-h-[130px] resize-none outline-none border-none text-lg ' 
                  ></textarea>
              </div>

              {/* add to your post */}
              <div className='mt-4 flex items-center justify-between'>
                  <h4 className='font-semibold mb-2'>Add to your post</h4>
                  
                  <div className='flex gap-3'>
                      <button 
                        onClick={() => handleAddImage()}
                        className='bg-blue-100 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors'
                      >
                          Photo/Video
                          <input
                            type="file"
                            accept="image/*"
                            ref={getImage}
                            onChange={(e) => setData(prev => ({...prev, img:e.target.files[0]}))}
                            hidden
                          />
                          
                      </button>
                      <button className='bg-green-100 text-green-600 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors'>
                          Tag Friends
                      </button>
                      <button className='bg-yellow-100 text-yellow-600 px-3 py-2 rounded-lg hover:bg-yellow-200 transition-colors'>
                          Feeling/Activity
                      </button>
                  </div>
              </div>


              {/* post button */}
              <button 
                className='mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
                  Post
              </button>
          </motion.div>
      </div>
    </AnimatePresence>
  )
}
  

