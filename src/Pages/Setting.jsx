import React from 'react'

const Setting = () => {
  return (
    <>
    <div className="bg-gray-100 min-h-screen flex justify-center p-6 mt-12">
  <div className="bg-white shadow-lg rounded-lg w-full md:w-3/4 lg:w-2/3">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>
      <p className="text-gray-600">Manage your preferences and account settings.</p>
    </div>

    {/* Profile Settings */}
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Display Name</label>
        <input
          type="text"
          className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your display name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email Address</label>
        <input
          type="email"
          className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email address"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Profile Picture</label>
        <input
          type="file"
          className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none"
        />
      </div>
    </div>

    {/* Account Settings */}
    <div className="p-6 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h3>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-700">Receive promotional emails</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-700">Two-factor authentication</span>
        </label>
      </div>
    </div>

    {/* Notification Preferences */}
    <div className="p-6 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h3>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-700">New message notifications</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-700">Friend request notifications</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-700">Daily summary notifications</span>
        </label>
      </div>
    </div>

    {/* Save Changes Button */}
    <div className="p-6">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Save Changes
      </button>
    </div>
  </div>
</div>

    
    
    </>
  )
}

export default Setting