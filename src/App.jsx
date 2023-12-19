
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Login/Register'
import ResetPassword from './Components/Login/Reset'
import ProtectedRoute from './Protected'
import Home from './Components/Home/Home'
import ForgotPassword from './Components/Login/ForgotPassword'




function App() {
  // const [count, setCount] = useState(0)

  return (
   <div>
       <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        {/* <Route path='/forgotPassword' element={<ForgotPass/>} /> */}
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/' element={<ProtectedRoute element={<Home />}/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
