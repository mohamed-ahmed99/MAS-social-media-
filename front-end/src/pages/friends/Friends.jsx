import React from 'react'
import FriendCards from './FriendCard.jsx'

export default function Friends() {

    const data = [
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
            {name:"Mohamed Ahmed Salah", mutualFriends:0, img:'/user.jpg'},
    ]









  return (
    <div className='grid grid-cols-3 lmd:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 lmd:gap-4 px-3 lmd:pr-5 lmd:pl-1 '>
        {data.map((friend, index) => {
          return <FriendCards key={index} friendData={friend} blueBtn="confirm"/>
        })}
      
    </div>
  )
}
