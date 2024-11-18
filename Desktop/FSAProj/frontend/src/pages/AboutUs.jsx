import React from 'react'

const AboutUs = () => {
  return (
    <div className='h-[80vh] bg-blue-100'>
    <div className='text-3xl text-[#5C99BA] font-bold flex flex-col items-center justify-between px-12 py-8'>
      <p>About Us</p>

      <div className='text-2xl text-blue-900'>
      <p>Welcome to a vibrant community for book lovers! </p>
      <p> We believe that every book deserves a new chapter and every reader a fresh adventure. </p>
        <p> Our platform connects readers to exchange, share, and discover books, making reading more accessible and sustainable for everyone.</p>
     </div>
    </div>

    
    <div className='flex flex-col items-end justify-end'>
    
      <img src='./about.png'/>
    </div>
    </div>
  )
}

export default AboutUs