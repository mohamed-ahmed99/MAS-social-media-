import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AuthLayout from './components/layouts/authLayout'
import VerifyEmail from './pages/VerifyEmail'
import Profile from './pages/profile/Profile'
import { useEffect, useState } from 'react'
import {PuffLoader } from 'react-spinners'
import { useUserContext } from './hooks/useUserContext'
import PagesLayout from './components/layouts/PagesLayout'

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
          const response = await fetch("http://localhost:5150/api/auth/verify-me", {
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

        {/* home page */}
        <Route path='/' element={<Home/>}/>

        {/* auth */}
        <Route element={<AuthLayout/>}>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/verify-email' element={<VerifyEmail/>}/>
        </Route>

        {/* pages */}
        <Route element={<PagesLayout/>}>
          <Route path='/profile' element={<Profile/>}/>
           
        </Route>

      </Routes>


      {/* loading when server check the token */}
      {loading && <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10'>
                <PuffLoader color="#000" size={100}/> </div>}
    </>
  )
  
}

export default App
