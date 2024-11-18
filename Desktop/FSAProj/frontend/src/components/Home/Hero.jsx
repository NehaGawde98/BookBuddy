import React from 'react';
import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  return (
    <div className="content">
      <div className="text-container">
        <h1 className="text-5xl font-semibold text-blue-950 mb-4">
          Discover your next read
        </h1>
        <p className="text-xl text-zinc-700 mb-6">
          Uncover stories... Enjoy themmm....
        </p>
        <div>
        <Link
          to="/books"
          className="text-yellow-50 bg-blue-400 text-xl font-serif border border-yellow-400 px-10 py-3 hover:bg-zinc-800 rounded-full"
        >
          Discover Books
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero