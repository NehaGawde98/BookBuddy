import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'



const Login = () => {
	const [Values, setValues] = useState({ username: '', password: '' ,})
	
	

		const change = (e) => {
			const {name, value } = e.target
			setValues({ ...Values, [name]: value})
		}
	
		const navigate = useNavigate()
		
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (
				Values.username === '' ||
				Values.email === '' ||
				Values.password === '' 
			) { 
				alert('All fields are required')
			}
			else {
				const response = await axios.post('http://localhost:1000/api/v1/login', Values)
				console.log(response.data)
				localStorage.setItem('id', response.data.id)
				localStorage.setItem('token', response.data.token)
				navigate('/');
				//alert(response.data.message)
			}

		}
		catch(error){
			console.log(error)
		}
	}

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form id='loginsub' className={styles.form_container}>
						<h1>Login to Your Account</h1>
						<input
							type="text"
							placeholder="Enter your username"
							name="username"
							onChange={change}
							value={Values.username}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Enter your Password"
							name="password"
							onChange={change}
							value={Values.password}
							required
							className={styles.input}
						/>
						
						<button className={styles.green_btn} onClick={handleSubmit}>
							Login
						</button>

						{/* password recovery */}
						{/* Add Forgot Password Link */}
						<div className={styles.forgot_password}>
              <Link to='/forgot-password' className={styles.link}>
                Forgot Password?
              </Link>
            </div>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to='/signup'>
						<button className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login