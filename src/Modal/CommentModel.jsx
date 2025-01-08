import { Modal } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const CommentModel = ({open,setopen}) => {
  return (


 <>
 
 <div>
 <Modal
    open={open}
      className="flex items-center justify-center p-5"
    >
       <div class="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-3 sm:p-6 space-y-4">
    {/* <!-- Modal Header --> */}
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Comments</h2>
      <button  onClick={()=>setopen(false)} class="text-gray-500 hover:text-gray-700">
        {/* <!-- Close Button (optional) --> */}
       <CloseIcon/>
      </button>
    </div>

    {/* <!-- Comment List --> */}
    <div class="max-h-64 overflow-y-auto space-y-4">
      {/* <!-- Comment Item --> */}
      <div class="flex space-x-3 items-start">
        <img
          class="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/40"
          alt="User Avatar"
        />
        <div class="flex-1">
          <div class="bg-gray-100 p-3 rounded-lg">
            <p class="text-gray-800">
              <span class="font-semibold">User 1</span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <p class="text-xs text-gray-500 mt-1">5 minutes ago</p>
        </div>
      </div>
      {/* <!-- Repeat this structure for more comments --> */}
      <div class="flex space-x-3 items-start">
        <img
          class="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/40"
          alt="User Avatar"
        />
        <div class="flex-1">
          <div class="bg-gray-100 p-3 rounded-lg">
            <p class="text-gray-800">
              <span class="font-semibold">User 2</span>
              Aenean viverra nisl vitae lacus tincidunt, at posuere elit rutrum.
            </p>
          </div>
          <p class="text-xs text-gray-500 mt-1">10 minutes ago</p>
        </div>
      </div>
    </div>

    {/* <!-- Add Comment Input --> */}
    <div class="flex items-center space-x-3">
      <img
        class="w-10 h-10 rounded-full"
        src="https://via.placeholder.com/40"
        alt="User Avatar"
      />
      <input
        type="text"
        placeholder="Add a comment..."
        class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
<SendIcon/>
      </button>
    </div>
  </div>
  
    </Modal>
 </div>
 
 
 </>

  )
}

export default CommentModel
