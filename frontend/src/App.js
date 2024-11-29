import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './component/Registration'
import Login from './component/Login'
import { contextapi } from './Contextapi'
import AdminDashboard from './component/AdminDashboard'
import Homepage from './component/Homepage'
import Navbar from './component/Navbar'
import ProductPage from './component/ProductPage'
import Footer from './component/Footer'
import AdminInsertForm from './component/AdminInsertForm'
import AdminEditForm from './component/AdminEditfForm'
import CartPage from './component/CartPage'


const App = () => {

  const [loginname, setLoginName] = useState(localStorage.getItem("loginname"))

  return (
    <div>

      <BrowserRouter>
        <contextapi.Provider value={{ loginname, setLoginName}}>
        <Navbar/>
          <Routes>
            <Route path='/Registration' element={<Registration />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/admindashboard' element={<AdminDashboard/>}/>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/productpage' element={<ProductPage/>}/>
            <Route path='/AdminInsertForm' element={<AdminInsertForm/>}/>
            <Route path='/adminproductupdate/:id' element={<AdminEditForm/>}/>
            <Route path='/cartpage' element={<CartPage />}/>
          </Routes>
          <Footer/>
        </contextapi.Provider>
      </BrowserRouter>

    </div>
  )
}

export default App