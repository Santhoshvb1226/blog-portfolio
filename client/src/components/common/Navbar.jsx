import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation() // refreshes the navbar when the page changes
    const [menuOpen, setMenuOpen] = useState(false)
    const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark')

    // Read the saved login from the browser
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    // Apply dark mode and remember the choice
    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }, [dark])

    // Close the mobile menu when the page changes
    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        navigate('/login')
    }

    const linkClass = ({ isActive }) =>
        `px-3 py-2 rounded-lg text-sm font-medium transition ${
            isActive
                ? 'text-orange-500 bg-orange-50 dark:bg-gray-800'
                : 'text-gray-600 dark:text-gray-300 hover:text-orange-500'
        }`

    const primaryBtn = 'bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow hover:opacity-90 transition'
    const outlineBtn = 'border border-orange-400 text-orange-500 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 dark:hover:bg-gray-800 transition'
    const iconBtn = 'w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition'

    return (
        <header className='sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-100 dark:border-gray-800'>
            <div className='px-4 sm:px-10 py-4 flex justify-between items-center'>

                {/* Logo */}
                <Link to="/home" className='text-2xl font-extrabold text-gray-900 dark:text-white'>
                    Personal<span className='text-orange-500'>.</span>
                </Link>

                {/* Desktop menu */}
                <nav className='hidden md:flex items-center gap-2'>
                    <NavLink to="/home" className={linkClass}>Home</NavLink>
                    <NavLink to="/blogs" className={linkClass}>Blogs</NavLink>

                    <button onClick={() => setDark(!dark)} className={`${iconBtn} ml-2`} aria-label="Toggle dark mode">
                        {dark ? '☀️' : '🌙'}
                    </button>

                    {token ? (
                        <div className='flex items-center gap-3 ml-2'>
                            <div className='flex items-center gap-2'>
                                <div className='w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold'>
                                    {email ? email.charAt(0).toUpperCase() : '?'}
                                </div>
                                <span className='text-sm text-gray-600 dark:text-gray-300'>{email}</span>
                            </div>
                            <button className={primaryBtn} onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className='flex items-center gap-2 ml-2'>
                            <button className={outlineBtn} onClick={() => navigate('/signup')}>Register</button>
                            <button className={primaryBtn} onClick={() => navigate('/login')}>Login</button>
                        </div>
                    )}
                </nav>

                {/* Mobile buttons */}
                <div className='md:hidden flex items-center gap-2'>
                    <button onClick={() => setDark(!dark)} className={iconBtn} aria-label="Toggle dark mode">
                        {dark ? '☀️' : '🌙'}
                    </button>
                    <button onClick={() => setMenuOpen(!menuOpen)} className={`${iconBtn} text-xl`} aria-label="Menu">
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className='md:hidden px-4 pb-4 flex flex-col gap-1'>
                    <NavLink to="/home" className={linkClass}>Home</NavLink>
                    <NavLink to="/blogs" className={linkClass}>Blogs</NavLink>

                    {token ? (
                        <>
                            <p className='px-3 py-2 text-sm text-gray-500 dark:text-gray-400'>Logged in as {email}</p>
                            <button className={primaryBtn} onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <div className='flex gap-2 mt-2'>
                            <button className={`${outlineBtn} flex-1`} onClick={() => navigate('/signup')}>Register</button>
                            <button className={`${primaryBtn} flex-1`} onClick={() => navigate('/login')}>Login</button>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}

export default Navbar