import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './LoginSignup.css'
import userIcon from '../../Assets/user.png'
import lock from '../../Assets/padlock.png'
import mail from '../../Assets/mail.png'

const UserSignup = () => {
    const initialvalues = { name: "", email: "", username: "", password: "", cnfpassword: "" }
    const [formvalues, setformvalues] = useState(initialvalues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIssubmit] = useState(false)

    const serverLink = "http://localhost:4000/"

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
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(formvalues);
            // console.log("Data Submitted");
            RegisterUser()
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {}
        if (!values.name) {
            errors.name = "Name is Required"
        }
        if (!values.email) {
            errors.email = "Email is Required"
        }
        if (!values.username) {
            errors.username = "Username is Required"
        } else if (values.username.split(" ").length > 1) {
            errors.username = "Username can't contain spaces"
        }
        if (!values.password) {
            errors.password = "Password is Required"
        }
        if (!values.cnfpassword) {
            errors.cnfpassword = "Confirm your Password"
        } else if (values.password !== values.cnfpassword) {
            errors.cnfpassword = "Password did not matched"
        }
        return errors
    }

    const RegisterUser = async () => {
        let response = await axios.post(`${serverLink}user/register`, formvalues)
        console.log(response.data);
    }

    return (
        <div className='container'>
            <div className='login'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit} >
                    <label>Name</label>
                    <div className='inp-cont'>
                        <img src={userIcon} alt='Icon' />
                        <input type='text'
                            autoFocus
                            placeholder='Type Your Name'
                            name='name'
                            value={formvalues.name}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.name}</p>
                    <br />
                    <label>Email</label>
                    <div className='inp-cont'>
                        <img src={mail} alt='Icon' />
                        <input type='email'
                            autoFocus
                            placeholder='Enter Your email'
                            name='email'
                            value={formvalues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.email}</p>
                    <br />
                    <label>Username</label>
                    <div className='inp-cont'>
                        <img src={userIcon} alt='Icon' />
                        <input type='text'
                            placeholder='Your Username here'
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
                    <br />
                    <label>Confirm Password</label>
                    <div className='inp-cont'>
                        <img src={lock} alt='Icon' />
                        <input type='password'
                            placeholder='Confirm Password Here'
                            name='cnfpassword'
                            value={formvalues.cnfpassword}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.cnfpassword}</p>
                    <div className='btn-cont'>
                        <button type='submit'>SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserSignup
