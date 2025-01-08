import React from 'react'

const Friends = () => {
  return (
    <>
      {/* <!-- Friends Section UI --> */}

      {/* <!-- Friends Section UI --> */}
      <div class="bg-gray-100 min-h-screen flex justify-center p-6 mt-12">
        <div class="bg-white shadow-lg rounded-lg w-full md:w-4/5 lg:w-4/5 p-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">My Friends</h2>

          {/* <!-- Friends List --> */}
          <ul class="space-y-4">
            {/* <!-- Example Friend Item --> */}
            <li class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
              <div class="flex items-center space-x-4">
                <img
                  class="w-12 h-12 rounded-full object-cover"
                  src="https://via.placeholder.com/150"
                  alt="Friend Profile"
                />
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Alice Johnson</h3>
                  <p class="text-sm text-gray-500">@alicejohnson</p>
                </div>
              </div>
              <button class="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">
                Message
              </button>
            </li>

            <li class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
              <div class="flex items-center space-x-4">
                <img
                  class="w-12 h-12 rounded-full object-cover"
                  src="https://via.placeholder.com/150"
                  alt="Friend Profile"
                />
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Bob Smith</h3>
                  <p class="text-sm text-gray-500">@bobsmith</p>
                </div>
              </div>
              <button class="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">
                Message
              </button>
            </li>
          </ul>

          {/* <!-- Add New Friend Section --> */}
          <div class="mt-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Add New Friend</h2>
            <div class="flex space-x-4">
              <input
                type="text"
                placeholder="Enter friend's username"
                class="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Add
              </button>
            </div>
          </div>

          {/* <!-- New Friends to Follow Section --> */}
          <div class="mt-12">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">New Friends to Follow</h2>
            <ul class="space-y-4">
              {/* <!-- Example New Friend Item --> */}
              <li class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                <div class="flex items-center space-x-4">
                  <img
                    class="w-12 h-12 rounded-full object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Suggested Friend Profile"
                  />
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Charlie Evans</h3>
                    <p class="text-sm text-gray-500">@charlieevans</p>
                  </div>
                </div>
                <button class=" bg-gradient-to-r from-blue-500 to-purple-900 text-white px-4 py-1 rounded-lg hover:to-purple-600 transition">
                  Follow
                </button>
              </li>

              <li class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                <div class="flex items-center space-x-4">
                  <img
                    class="w-12 h-12 rounded-full object-cover"
                    src="https://via.placeholder.com/150"
                    alt="Suggested Friend Profile"
                  />
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">Dana White</h3>
                    <p class="text-sm text-gray-500">@danawhite</p>
                  </div>
                </div>
                <button class=" bg-gradient-to-r from-blue-500 to-purple-900 text-white px-4 py-1 rounded-lg hover:to-purple-600 transition">
                  Follow
                </button>
              </li>


            </ul>
          </div>
        </div>
      </div>



    </>
  )
}

export default Friends