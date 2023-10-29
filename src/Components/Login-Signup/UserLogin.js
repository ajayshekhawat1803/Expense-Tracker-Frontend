import React, { useEffect, useState } from 'react'
import './LoginSignup.css'
import userIcon from '../../Assets/user.png'
import lock from '../../Assets/padlock.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
    const initialvalues = { username: "", password: "" }
    const [formvalues, setformvalues] = useState(initialvalues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIssubmit] = useState(false)

    const serverLink = "http://localhost:4000/"
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setformvalues({ ...formvalues, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formvalues))
        setIssubmit(true)
    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(formvalues);
            // console.log("Data Submitted");
            loginUser()
        }
    }, [formErrors])

    const loginUser = async () => {
        // console.log("Sending Data");
        let response = await axios.post(`${serverLink}user/login`, formvalues)
        response = response.data
        if (response.name) {
            localStorage.setItem("ExpenseTrackerUserData", JSON.stringify(response))
            alert("Successfull Login")
            navigate("/")
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.username) {
            errors.username = "Enter Your Username"
        }
        if (!values.password) {
            errors.password = "Password is required"
        }
        return errors
    }
    return (
        <div className='container'>
            <div className='login'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <div className='inp-cont'>
                        <img src={userIcon} alt='Icon' />
                        <input type='text' autoFocus
                            placeholder='Type Your Username'
                            name='username'
                            value={formvalues.username}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.username}</p>
                    <br />

                    <label>Password</label>
                    <div className='inp-cont'>
                        <img src={lock} alt='Icon' />
                        <input type='password'
                            placeholder='Type Your Password'
                            name='password'
                            value={formvalues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.password}</p>

                    <div className='btn-cont'>
                        <button type='submit' id='loginbtn'>Login</button>
                        <button onClick={() => navigate("/signup")}>SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserLogin
