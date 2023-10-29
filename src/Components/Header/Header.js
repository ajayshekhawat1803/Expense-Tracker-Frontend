import React, { useEffect, useState } from 'react'
import logo from '../../Assets/logo.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import menu from '../../Assets/menu.png'
import cross from '../../Assets/close.png'

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [UserAuth, setUserAuth] = useState({})
    const [sideHeader, setsideHeader] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const userData = localStorage.getItem("ExpenseTrackerUserData")
        setUserAuth(JSON.parse(userData))
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
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
                    <img id='menuIcon' src={menu} alt='not loaded' onClick={() => setsideHeader(true)} />
                    <div className='logo-cont'>
                        <Link to="/"><img src={logo} alt='Expense Tracker' /></Link>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/expenses">Expenses</Link></li>
                            <li><Link to="/investment">Investment</Link></li>
                            <li><Link to="/budget">Budget</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </nav>
                </div>
                <div >
                    {
                        UserAuth
                            ? <>
                                <button className='loginlogoutBtns' onClick={() => localStorage.removeItem("ExpenseTrackerUserData")}>Logout</button>

                            </>
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
            {
                sideHeader &&
                <div className='sideHeader'>
                    <div className='logo-cont'>
                        <Link to="/"><img src={logo} alt='Expense Tracker' /></Link>
                        <img src={cross} alt='Close' onClick={() => setsideHeader(false)} />
                    </div>
                    <ul>
                        <li><Link to="/" onClick={() => setsideHeader(false)}>Home</Link></li>
                        <li><Link to="/expenses" onClick={() => setsideHeader(false)}>Expenses</Link></li>
                        <li><Link to="/investment" onClick={() => setsideHeader(false)}>Investment</Link></li>
                        <li><Link to="/budget" onClick={() => setsideHeader(false)}>Budget</Link></li>
                        <li><Link to="/profile" onClick={() => setsideHeader(false)}>Profile</Link></li>
                    </ul>
                </div>
            }
        </>
    )
}

export default Header
