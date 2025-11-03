import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/home/Page'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AuthLayout from './components/layouts/authLayout'
import VerifyEmail from './pages/VerifyEmail'
import Profile from './pages/profile/Profile'
import { useEffect, useState } from 'react'
import { useUserContext } from './hooks/useUserContext'
import PagesLayout from './components/layouts/PagesLayout'
import AppLoading from './components/AppLoading'

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
      if(!token) return navigate('/signin')

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
            setUserData(data.user)
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
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/friends' element={<Profile/>}/>
          <Route path='/photos' element={<Profile/>}/>
          <Route path='/notifications' element={<Profile/>}/>
          <Route path='/settings' element={<Profile/>}/>
          <Route path='/chat' element={<Profile/>}/>
           
        </Route>

      </Routes>


      {/* loading when server check the token */}
      {loading && <div className='fixed inset-0 flex items-center justify-center z-[9999]'>
                <AppLoading/> </div>}
    </>
  )
  
}

export default App
