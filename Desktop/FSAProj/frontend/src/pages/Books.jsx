import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import SearchBook from '../components/SearchBook/SearchBook'

const Books = () => {
  const [allBooks, setAllBooks] = useState([]) // Store all books
  const [filteredBooks, setFilteredBooks] = useState([]) // Store filtered books for display
  const [loading, setLoading] = useState(true) // Loading state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-all-books')
        setAllBooks(response.data.data) // Save all books
        setFilteredBooks(response.data.data) // Initially display all books
        setLoading(false) // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching books:', error)
        setLoading(false); // Stop loading on error
      }
    }
    fetchBooks()
  }, [])

  // Function to handle search results from the SearchBook component
  const handleSearchResults = (results) => {
    setFilteredBooks(results) // Update displayed books
  }

  return (
    <div className="bg-[#ebf8ff] auto px-12 py-8">
      <div className="holder">
        <header className="header">
          <div className="header-content flex flex-col text-center text-white">
            <h2 className="header-title text-capitalize text-[#5C99BA] text-3xl">Find your book of choice...</h2>
            <br />
            {/* Pass setResults as prop to SearchBook */}
            <SearchBook setResults={handleSearchResults} books={allBooks} />
          </div>
        </header>
      </div>

      {/* Show Loader when data is loading */}
      {loading && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}

      {/* Display books */}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredBooks.map((book, index) => (
          <div key={index}>
            <BookCard data={book} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books