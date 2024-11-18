import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react' 
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { FaEdit } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'

const ViewBookDetails = () => {
    const {id} = useParams()
    const [Data, setData] = useState()
   // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   //const isLoggedIn = true 

  const navigate = useNavigate()

  useEffect(() => {
    // Check if token exists in localStorage
  setIsLoggedIn(localStorage.getItem('token') !== null) })
 

    useEffect(() => {
     const fetch = async() => {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`)
      setData(response.data.data)
    }
    fetch()
  }, [] )

  const editBook = async () => {
    const response = await axios.delete('http://localhost:1000/api/v1/update-book', {headers})
    console.log(response)
    alert(response.data.message)
    navigate('/books')
  }

  const deleteBook = async () => {
    const response = await axios.delete('http://localhost:1000/api/v1/delete-book', {headers})
    console.log(response)
    alert(response.data.message)
    navigate('/books')
  }

  const headers =  {     
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    bookid: id,
  }
  
  return (
    <> 
    {Data &&  (
    <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8' >
        <div className='bg-zinc-800 rounded p-4 h-[80vh] w-full lg:w-3/6 flex items-center justify-center'>
        {' '}
        <img src={Data.url} alt='/' className='h-[50vh] lg:h-[70vh]'/> 
        </div>
        {isLoggedIn ? (
        <><div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
              <Link 
              to={`/update-book/${id}`}
              className='bg-white rounded p-3 lg:rounded-full text-3xl lg:text-3xl flex items-center justify-center'
              >
                <FaEdit /> {''}
                <span className='ms-4 block lg:hidden'>Edit</span>
              </Link>
              <button className='text-red-500 rounded lg:rounded-full text-2xl lg:text-3xl p-3 mt-8 md:mt-0 lg:mt-8 bg-white flex items-baseline justify-center'
              onClick={deleteBook}>
                <MdOutlineDelete />
                <span className='ms-4 block lg:hidden'>Delete Book</span>
              </button>
              </div>
           
            <div className='p-4 w-full lg:w-3/6 rounded'>
                <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
                <p className='text-zinc-400 text-3xl mt-1'>by {Data.author}</p>
                <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
                <p className='text-zinc-400 text-2xl'>Genre: {Data.genre}</p>
                <p className='text-zinc-400 text-2xl'>Availability Status: {Data.avail_status}</p>
              </div>
             
              </>
  
    ) :(
      <div className='p-4 w-full lg:w-3/6 rounded'>
      <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
      <p className='text-zinc-400 text-3xl mt-1'>by {Data.author}</p>
      <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
      <p className='text-zinc-400 text-2xl'>Genre: {Data.genre}</p>
      <p className='text-zinc-400 text-2xl'>Availability Status: {Data.avail_status}</p>
    </div>
    )}
      </div>

    )}
    {!Data && <div className='h-screen bg-zinc-900 items-center justify-center'><Loader /></div>}
    </>
  )
} 

export default ViewBookDetails