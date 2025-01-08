import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
<>


<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="text-center">
    <h1 className="text-9xl font-bold text-blue-600">404</h1>
    <h2 className="text-3xl font-semibold text-gray-800 mt-4">Oops! Page Not Found</h2>
    <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
    <div className="mt-6">
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
    <div className="mt-8">
      <img
        src="https://via.placeholder.com/400x300" 
        alt="Error Image"
        className="mx-auto"
      />
    </div>
  </div>
</div>



</>
  )
}

export default ErrorPage