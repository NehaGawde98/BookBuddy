import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import axios from 'axios'

const SignUp = () => {
	const [Values, setValues] = useState ({
		username: '',
		email: '',
		password:'',
	})

	const change = (e) => {
		const {name, value } = e.target
		setValues({ ...Values, [name]: value})
	}

	const navigate = useNavigate()

	const submit = async () => {
		try {
			if (
				Values.username === '' ||
				Values.email === '' ||
				Values.password === '' 
			) { 
				alert('All fields are required')
			}
			else {
				const response = await axios.post('http://localhost:1000/api/v1/signup', Values)
				
				navigate('/login')
				//alert(response.data.message)
			}

		}
		catch(error){
			console.log(error)
		}
	}

	return (
		<div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to='/login'>
                        <button type='button' className={styles.white_btn}>
                            Login
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form name='signfields' className={styles.form_container} >
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            onChange={change}
                            value={Values.username}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Enter email id"
                            name="email"
                            onChange={change}
                            value={Values.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={change}
                            value={Values.password}
                            required
                            className={styles.input}
                        />
                       
                        <button className={styles.green_btn} onClick={submit}
						>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
	)

}

export default SignUp