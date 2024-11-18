import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'


const AddBooks = () => {
    const [Data, setData] = useState({ 
        title:'', 
        author:'',
        genre:'', 
        desc:'',
        url:'',
        avail_status:'',
    })

    const headers =  {     
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
        
        
    } 
    
    const navigate = useNavigate()
    

    const change = (e) => {
    const {name, value } = e.target
    setData({...Data, [name]: value })
    }

    const submit = async () => {
        

    try {
        if (
            Data.title === '' ||
            Data.author === '' ||
            Data.url === '' ||
            Data.genre === '' ||
            Data.desc === '' ||
            Data.avail_status === '' 
        ) {
            alert('All fields are required')
        }
        else {
            
          
                const response = await axios.post('http://localhost:1000/api/v1/add-book', Data, {headers})
				console.log(response.data)
				
				//navigate('/')
        
        
            setData ({
                title: '',
                author:'',
                url: '',
                genre: '',
                desc: '',
                avail_status:''
            })
            console.log(Data)
            alert(response.data.message)
            navigate('/books')
        }
    }
    catch(error)
    {
    console.error('Error occurred during submit:', error)
    if (error.response) {
        alert(error.response.data.message)
    } else if (error.request) {
        alert('No response from the server. Please check your network.')
    } else {
        alert(`Unexpected error: ${error.message}`)
    }
}
    }

  return (
    <div className='bg-[#ebf8ff] flex justify-center items-center' 
    style={{ minHeight: '80vh' }}>
        <div className='container p-4'>
            <h1 className='text-3xl text-[#5C99BA] text-center font-semibold'>Add New Book Here...</h1>
            <div className='container p-4 border-2 border-gray-400 rounded-md shadow-lg'>
            <div className='mb-3'>
                <label 
                htmlFor='newbook'
                className='form-label text-blue-900'>Add Book Title</label>
                <input 
                    className="form-control"
                    id="newbook"
                    type="text"
                    placeholder='Enter book title'
                    name='title'
                    required
                    onChange={change}
                    value={Data.title}
                />
            </div>

            <div className='mb-3'>
                <label 
                htmlFor='bookauthor'
                className='form-label text-blue-900'>Add Author Name</label>
                <input 
                    className="form-control"
                    id="authorname"
                    type="text"
                    placeholder="Enter author name"
                    name="author"
                    required
                    onChange={change}
                    value={Data.author}
                />  
            </div>

            <div className='mb-3'>
                <label 
                htmlFor='genre'
                className='form-label text-blue-900'>Add Book Genre</label>
                <input 
                    className="form-control"
                    id="bookgenre"
                    type="text"
                    placeholder="Enter book genre"
                    name="genre"
                    required
                    onChange={change}
                    value={Data.genre}
                />     
            </div>

            <div className='mb-3'>
                <label 
                htmlFor='bookimg'
                className='form-label text-blue-900'>Add Book Image</label>      
                <input 
                    className="form-control"
                    id="bookimg"
                    type="text"
                    placeholder="Enter book url for image"
                    name="url"
                    required
                    onChange={change}
                    value={Data.url}
                /> 
            </div> 

            <div className='mb-3'>
                <label 
                htmlFor='bookdesc'
                className='form-label text-blue-900'>Add Book Description</label>      
                <input 
                    className="form-control"
                    id="bookdesc"
                    type="text"
                    placeholder="Enter book description"
                    name="desc"
                    required
                    onChange={change}
                    value={Data.desc}
                />  
            </div>

            <div className='mb-3'>
                <label 
                htmlFor='bookstatus'
                className='form-label text-blue-900'>Add Book availability status</label>      
                <input 
                    className="form-control"
                    id="status"
                    type="text"
                    placeholder="Enter book availability status"
                    name="avail_status"
                    required
                    onChange={change}
                    value={Data.avail_status}
                />  
            </div>

            <div> 
                <button className='text-white bg-[#5C99BA] px-4 py-2 rounded' onClick={submit}>Add Book</button>
            </div>                 
            </div>
        </div>
   </div>
  )
}

export default AddBooks