import React from 'react'
import Post from '../../components/Post'

export default function Posts() {
  return (
    <div className='col-span-10 lg:col-span-6 space-y-1 mt-2'>
        <Post profile={true}/>
        <Post img={'user.jpg'} profile={true}/>
        <Post profile={true}/>
        <Post profile={true}/>
        <Post img={'user.jpg'} profile={true}/>
        <Post profile={true}/>
        <Post profile={true}/>
        <Post img={'user.jpg'} profile={true}/>
        <Post profile={true}/>
        <Post profile={true}/>
        <Post img={'user.jpg'} profile={true}/>
        <Post profile={true}/>
      
    </div>
  )
}
