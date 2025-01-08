import React from 'react'

const Otp = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center p-3 sm:p-0">
    <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm transform transition-transform hover:scale-105 duration-300">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Verify OTP
      </h2>
      <p className="text-gray-600 text-center mb-4">
        Enter the OTP sent to your email.
      </p>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          maxLength="6"
          className="w-full border border-gray-300 rounded-md p-3 text-center text-xl tracking-widest focus:outline-none focus:border-purple-600 transition-colors duration-200"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md p-3 transition-colors duration-200"
        >
          Submit OTP
        </button>
      </form>
    </div>
  </div>
  
  )
}

export default Otp
