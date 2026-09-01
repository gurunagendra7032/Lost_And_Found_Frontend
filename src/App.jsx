import { useState } from 'react'
import Home from "./pages/Home.jsx"
import Found from "./pages/Found.jsx"
import { Routes, Route } from "react-router-dom"
import Lost from './pages/Lost.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import AllFoundItems from './pages/AllFoundItems.jsx'
import AllLostItems from './pages/AllLostItems.jsx'
import Notification from './pages/Notification.jsx'
import Admin from './pages/Admin.jsx'
import AdminFoundItems from './pages/AdminFoundItems.jsx'
import AdminLostItems from './pages/AdminLostItems.jsx'
import AdminCurrentStorageItems from './pages/AdminCurrentStorageItems.jsx'
import AdminReturnItems from './pages/AdminReturnItems.jsx'
import AdminSignup from './pages/AdminsignUp.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Notification/>
    <Routes>
       <Route path="/homepage" element={<Home />} />
       <Route path="/found" element={<Found />} />
       <Route path="/lost" element={<Lost />} />
       <Route path="/signup" element={<Signup/>} />
       <Route path="/" element={<Login/>} />
       <Route path="/allfounditems" element={<AllFoundItems/>}/>
       <Route path="/alllostitems" element={<AllLostItems/>}/>
       <Route path="/admin/dashboard" element={<Admin/>}/>
       <Route path="/admin/founditems" element={<AdminFoundItems/>}/>
       <Route path="/admin/lostitems" element={<AdminLostItems/>}/>
       <Route path="/admin/lostitems" element={<AdminLostItems/>}/>
       <Route path="/admin/CurrentStorageitems" element={<AdminCurrentStorageItems/>}/>
       <Route path="/admin/CurrentStorageitems" element={<AdminCurrentStorageItems/>}/>
       <Route path="/admin/returnItems" element={<AdminReturnItems/>}/>
       <Route path="/admin/SignUp" element={<AdminSignup/>}/>
       
       

    </Routes>
    </>
  )
}

export default App
