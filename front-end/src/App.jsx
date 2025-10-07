import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>

            {/* home page */}
            <Route path='/' element={<Home/>}/>

            {/* auth */}
            <Route path='/signup' element={<SignUp/>}/>


          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
