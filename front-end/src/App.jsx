import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/home/Page'
import ProfilePage from './pages/profile/Page'
import { useEffect, useState } from 'react'
import { useUserContext } from './hooks/useUserContext'
import PagesLayout from './components/layouts/PagesLayout'
import AppLoading from './components/AppLoading'
import All from './pages/profile/All'
import NotFound from './pages/NotFound'
import AllFriends from './pages/profile/AllFriends'
import FriendsPage from './pages/friends/Page'
import Friends from './pages/friends/Friends'
import Suggestions from './pages/friends/Suggestions'
import Pendings from './pages/friends/Pendings'
import FriendRequests from './pages/friends/Requestes'


// auth
import AuthLayout from './pages/auth/AuthLayout'
import Signup from './pages/auth/signup/Signup'
import VerifyEmail from './pages/auth/signup/VeifyEmail'
import Signin from './pages/auth/signup/Signin'



// User Page 
import UserPage from './pages/users/page'
import AllUserPage from './pages/users/All'

// notications
import Notification from './pages/notifications/page'


function App() {
  return (
    <BrowserRouter>  <AppRoutes/>  </BrowserRouter>
  )

}

const AppRoutes = () => {
    const {userData, setUserData} = useUserContext()
   

    const [loading, setIsLoading] = useState(false)
    


    return (
    <>
      <Routes>

        {/* auth */}
        <Route element={<AuthLayout/>}>
            <Route path='/auth/signup' element={<Signup/>}/>
            <Route path='/auth/signin' element={<Signin/>}/>
            <Route path='/auth/verify-email' element={<VerifyEmail/>}/>
        </Route>

        {/* pages */}
        <Route element={<PagesLayout/>}>
          <Route path='/' element={<Home/>}/>

          {/* profile */}
          <Route path='/profile' element={<ProfilePage/>}>
            <Route index element={<All/>}/>
            <Route path='friends' element={<AllFriends/>}/>

          </Route>



          {/* friends */}
          <Route path='/friends' element={<FriendsPage/>}>
            <Route index element={<Friends/>}/>
            <Route path='friends_requests' element={<FriendRequests/>}/>
            <Route path='friends_suggestions' element={<Suggestions/>}/>
            <Route path='pendings' element={<Pendings/>}/>
          </Route>

          {/* userPage */}
          <Route path='/user/:username' element={<UserPage/>}>
              <Route index element={<AllUserPage/>}/>
          </Route>
          

          <Route path='/notifications' element={<Notification/>}/>


          {/* other pages - not implemented yet */}
          <Route path='/photos' element={<NotFound/>}/>
          <Route path='/settings' element={<NotFound/>}/>
          <Route path='/chat' element={<NotFound/>}/>
           
        </Route>

        <Route path='*' element={<NotFound/>}/>
      </Routes>


      {/* loading when server check the token */}
      {loading && <div className='fixed inset-0 flex items-center justify-center z-[9999]'>
                <AppLoading loading={loading}/>
       </div>
      }
    </>
  )
  
}

export default App
