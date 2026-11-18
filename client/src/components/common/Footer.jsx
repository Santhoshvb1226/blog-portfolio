import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 rounded-2xl bg-gray-900 dark:bg-gray-800 text-gray-300 px-6 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-extrabold text-white">
            Personal<span className="text-orange-500">.</span>
          </h3>
          <p className="text-sm text-gray-400 mt-1">Sharing ideas, one blog at a time.</p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/home" className="hover:text-orange-400 transition">Home</Link>
          <Link to="/blogs" className="hover:text-orange-400 transition">Blogs</Link>
          <Link to="/login" className="hover:text-orange-400 transition">Login</Link>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs text-gray-500">
        © {year} Santhosh. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer