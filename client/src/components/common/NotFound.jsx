
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="text-center py-24">
      <p className="text-7xl mb-4">🧭</p>
      <h1 className="text-5xl font-extrabold mb-3">
        404 <span className="text-orange-500">Not Found</span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate('/home')}
        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-7 py-3 rounded-lg shadow-lg hover:opacity-90 transition"
      >
        Go to Home
      </button>
    </div>
  )
}

export default NotFound
