import React from 'react'
import './LoginSignup.css'
import userIcon from '../../Assets/user.png'
import lock from '../../Assets/padlock.png'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
    const navigate = useNavigate()
    return (
        <div className='container'>
            <div className='login'>
                <h2>Login</h2>
                <form>
                    <label>Username</label>
                    <div className='inp-cont'>
                        <img src={userIcon} alt='Icon' />
                        <input type='text' autoFocus placeholder='Type Your Username' />
                    </div>
                    <br />
                    <label>Password</label>
                    <div className='inp-cont'>
                        <img src={lock} alt='Icon' />
                        <input type='password' placeholder='Type Your Password' />
                    </div>
                    <div className='btn-cont'>
                        <button type='submit' id='loginbtn'>Login</button>
                        <button type='submit'onClick={()=>navigate("/signup")}>SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserLogin
