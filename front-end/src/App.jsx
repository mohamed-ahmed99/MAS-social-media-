import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/home/Page'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AuthLayout from './components/layouts/authLayout'
import VerifyEmail from './pages/VerifyEmail'
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
import Requestes from './pages/friends/Requestes'
import Suggestions from './pages/friends/Suggestions'

// User Page 
import UserPage from './pages/users/page'
import AllUserPage from './pages/users/All'


function App() {
  return (
    <BrowserRouter>  <AppRoutes/>  </BrowserRouter>
  )

}

const AppRoutes = () => {
    const navigate = useNavigate()
    const {userData, setUserData} = useUserContext()

    const [loading, setIsLoading] = useState(true)
    

    const CheckToken = async () => {
      setIsLoading(true)
      const token = localStorage.getItem("MASproAuth")
      if(!token) {
        setIsLoading(false)
        return navigate('/signin')
      }

        // call back
        try{
          // http://localhost:5150/api/auth/verify-me
          //https://masproback.vercel.app/api/auth/verify-me
          const response = await fetch("https://masproback.vercel.app/api/auth/verify-me", {
            method:"GET",
            headers:{
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })

          const data = await response.json()
          
          if(!response.ok) {
              return navigate('/signin')
          }else{
            console.log('start',data.data)
            setUserData(data.data)
          }
        }
        catch(error){
          setIsLoading(false)
          return {error:error.message}
        }finally{
          setIsLoading(false)
        }
    }
    useEffect(() => { CheckToken() } ,[])


    return (
    <>
      <Routes>

        {/* auth */}
        <Route element={<AuthLayout/>}>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/verify-email' element={<VerifyEmail/>}/>
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
            <Route path='friends_requests' element={<Requestes/>}/>
            <Route path='friends_suggestions' element={<Suggestions/>}/>
          </Route>

          {/* userPage */}
          <Route path='/user/:username' element={<UserPage/>}>
              <Route index element={<AllUserPage/>}/>
          </Route>
          

          {/* other pages - not implemented yet */}
          <Route path='/photos' element={<NotFound/>}/>
          <Route path='/notifications' element={<NotFound/>}/>
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
