import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AuthLayout from './components/layouts/authLayout'
import VerifyEmail from './pages/VerifyEmail'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>

            {/* home page */}
            <Route path='/' element={<Home/>}/>

            {/* auth */}
            <Route element={<AuthLayout/>}>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/verify-email' element={<VerifyEmail/>}/>
            </Route>

            {/*  */}


          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
