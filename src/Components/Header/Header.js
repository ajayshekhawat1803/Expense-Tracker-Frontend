import React, { useEffect, useState } from 'react'
import logo from '../../Assets/logo.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {
    const [UserAuth, setUserAuth] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const userData = localStorage.getItem("UserAuth")
        console.log(userData);
        setUserAuth(userData)
    }, [])

    return (
        <>
            <header>
                <div className='logo-cont'>
                    <Link><img src={logo} alt='Expense Tracker' /></Link>
                </div>
                <nav>
                    <ul>
                        <li><Link>Home</Link></li>
                        <li><Link>Expenses</Link></li>
                        <li><Link>Investment</Link></li>
                        <li><Link>Budget</Link></li>
                        <li><Link>Profile</Link></li>
                    </ul>
                </nav>
                <div >
                    {
                        UserAuth
                            ? <button className='loginlogoutBtns'>Logout</button>
                            : <>
                                <button className='loginlogoutBtns'
                                    onClick={() => navigate("/login")}
                                >Login</button>
                            </>
                    }
                </div>
            </header>
        </>
    )
}

export default Header
