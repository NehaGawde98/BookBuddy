import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineSegment } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {

   const { logout } = useAuth0()
    const navigate = useNavigate()
    const links = [
        {
            title: 'Home',
            link: '/',
        },
        {
            title: 'Books',
            link: '/books',
        },
        {
            title: 'AboutUs',
            link: '/about-us',
        },
       
    ]

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [MobileNav, setMobileNav] = useState('hidden')   
    
    useEffect(() => {
        // Check if token exists in localStorage 
        setIsLoggedIn(localStorage.getItem('token') !== null) })

    const handleLogout = () => {
        localStorage.removeItem('token')
        
        logout({ returnTo: window.location.origin }) 
        setIsLoggedIn(false)
       
    }

    return (
     <>
        <nav className='z-50 relative flex bg-zinc-600 text-white px-8 py-4  items-center justify-between'>
            <div className='flex items-center'>
                <img className='h-10 me-4'
                src="./logo-2.jpg"
                alt='logo'
                />
                <h1 className='text-3xl font-serif'> BookBuddy</h1>
            </div>

        <div className='nav-links-bookexchange block md:flex align-items-center gap-4'>
            <div className='hidden md:flex gap-4'>
                {links.map((items, i) => (
                    <Link to ={items.link} 
                        className='no-underline text-white hover:text-blue-500 transition-all duration-300 text-2xl font-medium font-serif'
                        key={i}>
                        {items.title} 
                    </Link>
            ))}
       

        
     
        
        <div>
        {isLoggedIn ? (
                    <>
                    <div className='nav-links-bookexchange block md:flex align-items-center gap-4'>
                        <button className='text-white hover:text-blue-500 transition-all duration-300 text-2xl font-medium font-serif' onClick={() => navigate('/add-book')}>
                            Add Books
                        </button>
                        <button className='text-white hover:text-blue-500 transition-all duration-300 text-2xl font-medium font-serif' onClick={handleLogout}>
                            Log Out
                        </button>
                        </div>
                    </>
                ) : (
                    <div className='hidden md:flex gap-4'>
            <Link 
            to='/Login' 
            className='px-2 py-1 border text-white rounded hover:bg-blue-300 hover:text-zinc-800 transition-all duration-300 text-2xl'>
                Login
            </Link>
        </div> 
                )}
                
                </div>
                </div>
            
      
        <button className='text-white text-2xl hover:text-zinc-400' onClick={()=> (MobileNav === 'hidden' ? setMobileNav('block') : setMobileNav('hidden'))}><MdOutlineSegment /></button>
        </div>
        </nav>
        <div 
            className ={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
            {links.map((items, i) => (
                    <Link to ={items.link} 
                        className={`${MobileNav} text-white text-3xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300`}
                        key={i}
                        onClick={()=> (MobileNav === 'hidden' ? setMobileNav('block') : setMobileNav('hidden'))}>
                        {items.title} {" "}
                    </Link>
             ))}
            <Link 
            to='/Login' 
            className={`${MobileNav} px-2 py-2 border text-3xl border-blue-500 rounded text-white  hover:bg-white hover:text-zinc-800 transition-all duration-300`}>
                Login
            </Link> 
        </div>
    </>
  )
}

export default Navbar