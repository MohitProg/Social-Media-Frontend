import React from 'react'

const Messaging = () => {
  return (
  <>
  
  
  <div className="bg-gray-100 min-h-screen flex justify-center p-6 mt-12">
  <div className="bg-white shadow-xl rounded-lg flex flex-col md:flex-row w-full md:w-4/5 lg:w-4/5">
    {/* Members List Sidebar */}
    <div className="w-full md:w-1/4 bg-gray-50 shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Members</h2>
      <ul className="space-y-4">
        {/* Member List Items */}
        <li className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="User Profile"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </li>
        <li className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="User Profile"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Jane Smith</h3>
            <p className="text-sm text-gray-500">Offline</p>
          </div>
        </li>
        {/* Add more members here */}
      </ul>
    </div>

    {/* Message Container */}
    <div className="w-full md:w-3/4 bg-white shadow-md p-6 flex flex-col justify-between rounded-lg">
      {/* Message Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="User Profile"
          />
          <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
        </div>
        <p className="text-sm text-gray-500">Last seen 2 hours ago</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example Incoming Message */}
        <div className="flex items-start space-x-4">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="User Profile"
          />
          <div className="bg-gray-200 rounded-lg p-4 max-w-xs shadow-sm">
            <p className="text-gray-700">Hey, how's it going?</p>
          </div>
        </div>

        {/* Example Outgoing Message */}
        <div className="flex items-start space-x-4 justify-end">
          <div className="bg-blue-500 text-white rounded-lg p-4 max-w-xs shadow-lg">
            <p>Good! Working on the project now.</p>
          </div>
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="Your Profile"
          />
        </div>

        {/* More messages go here */}
      </div>

      {/* Message Input */}
      <div className="mt-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


  </>
  )
}

export default Messaging