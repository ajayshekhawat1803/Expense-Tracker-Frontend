import React, { useEffect, useState } from 'react'
import logo from '../../Assets/logo.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [UserAuth, setUserAuth] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const userData = localStorage.getItem("UserAuth")
        // console.log(userData);
        setUserAuth(userData)
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
                console.log("hello");
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <header className={scrolled ? 'scrolled' : ''}>
                <div>
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
                </div>
                <div >
                    {
                        UserAuth
                            ? <button className='loginlogoutBtns'>Logout</button>
                            : <>
                                <button className='loginlogoutBtns'
                                    onClick={() => navigate("/login")}
                                >Login</button>
                                <button className='loginlogoutBtns' id='signupbtn'
                                    onClick={() => navigate("/signup")}
                                >SignUp</button>
                            </>
                    }
                </div>
            </header>
        </>
    )
}

export default Header
