import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Books from './pages/Books'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import AddBooks from './pages/AddBooks'
import UpdateBook from './pages/UpdateBook'
import { useEffect } from 'react'
import ForgotPwd from './components/ForgotPwd/ForgotPwd'


const App = () => {
  useEffect(() => {
    localStorage.getItem('id') && 
    localStorage.getItem('token')
  })

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
    
          <Route exact path='/' element={<Home />} /> 
          <Route path='/books' element={<Books />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/login' element={<Login />} /> 
          <Route path='/forgot-password' element={<ForgotPwd />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='view-book-details/:id' element={<ViewBookDetails />} /> 
          <Route path='/add-book' element={<AddBooks />} />
          <Route path='/update-book/:id' element={<UpdateBook />} />
        </Routes>
        <Footer />

      </Router>
     
    </div>
  )
}

export default App