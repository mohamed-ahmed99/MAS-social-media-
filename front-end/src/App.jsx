import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/home/Page'
import ProfilePage from './pages/profile/Page'
import { useState, useEffect } from 'react'
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


// auth pages
import AuthLayout from './pages/auth/AuthLayout' // auth layout
import Signup from './pages/auth/signup/Signup' // signup page
import VerifyEmail from './pages/auth/signup/VeifyEmail' // verify email page
import Signin from './pages/auth/signup/Signin' // signin page



// User Page 
import UserPage from './pages/users/page' // user page
import AllUserPage from './pages/users/All' // all user page

// notications
import Notification from './pages/notifications/page' // notification page

// my hooks
import { useGetMethod } from './hooks/useGetMethod' // get method
import { useGlobalData } from './hooks/useStore' // global data


function App() {
  return (
    <BrowserRouter>  <AppRoutes />  </BrowserRouter>
  )

}

const AppRoutes = () => {

  console.log("app routes")

  const navigate = useNavigate()
  const location = useLocation()

  const { getData, status_g, message_g, data_g, loading_g, action_g } = useGetMethod()
  const [store, setGlobalData] = useGlobalData()
  console.log(store)

  // check if user is logged in
  useEffect(() => {
    const verifyMe = async () => {
      // url
      // http://localhost:5150/api/auth/verify-me
      // https://masproback.vercel.app/api/auth/verify-me
      await getData("https://masproback.vercel.app/api/auth/verify-me")
    }
    verifyMe()
  }, [])


  useEffect(() => {
    if (status_g === "success") {
      const userStatus = data_g?.user?.status

      // if user is not verified
      if (userStatus === "Unverified") {
        setGlobalData("authenticated", false)

        // if user is not verified and not on verify email page, redirect to verify email page
        if (location.pathname !== "/auth/verify-email") {
          navigate("/auth/verify-email")
        }
      } else {
        setGlobalData("authenticated", true)
        setGlobalData("user", data_g.user)

        // if user is already logged in and tries to go to auth pages, redirect to home
        if (location.pathname.startsWith("/auth")) {
          navigate("/")
        }
      }  
    }
    
    else if (status_g === "fail") {
      // if user is not logged in
      if (!store.authenticated) {
        setGlobalData("authenticated", false)
        // if user is not logged in and not on auth pages, redirect to signin
        if (!location.pathname.startsWith("/auth")) {
          navigate("/auth/signin")
        }
      }
    }
  }, [status_g, location.pathname, store.authenticated])


  /// 1. loading state 
  if (status_g === 'idle' || loading_g) return <AppLoading />

  /// 2. if we are about to navigate, keep showing loading
  const isAuthRoute = location.pathname.startsWith('/auth')
  const isUnverified = status_g === 'success' && data_g?.user?.status === 'Unverified'

  // if user is not logged in and not on auth pages
  if (status_g === 'fail' && !store.authenticated && !isAuthRoute) {
    return <AppLoading />
  }

  // if user is not verified and not on verify email page
  if (isUnverified && location.pathname !== '/auth/verify-email') {
    return <AppLoading />
  }

  /// 3. if we are about to navigate, keep showing loading
  const isAuthenticated = status_g === 'success' && data_g?.user?.status === 'Active'
  if (isAuthenticated && location.pathname.startsWith('/auth')) {
    return <AppLoading />
  }







  return (
    <>
      <Routes>

        {/* auth */}
        <Route element={<AuthLayout />}>
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/signin' element={<Signin />} />
          <Route path='/auth/verify-email' element={<VerifyEmail />} />
        </Route>


        {/* pages */}
        <Route element={<PagesLayout />}>
          <Route path='/' element={<Home />} />

          {/* profile */}
          <Route path='/profile' element={<ProfilePage />}>
            <Route index element={<All />} />
            <Route path='friends' element={<AllFriends />} />

          </Route>



          {/* friends */}
          <Route path='/friends' element={<FriendsPage />}>
            <Route index element={<Friends />} />
            <Route path='friends_requests' element={<FriendRequests />} />
            <Route path='friends_suggestions' element={<Suggestions />} />
            <Route path='pendings' element={<Pendings />} />
          </Route>

          {/* userPage */}
          <Route path='/user/:username' element={<UserPage />}>
            <Route index element={<AllUserPage />} />
          </Route>


          <Route path='/notifications' element={<Notification />} />


          {/* other pages - not implemented yet */}
          <Route path='/photos' element={<NotFound />} />
          <Route path='/settings' element={<NotFound />} />
          <Route path='/chat' element={<NotFound />} />

        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>

    </>
  )

}

export default App
