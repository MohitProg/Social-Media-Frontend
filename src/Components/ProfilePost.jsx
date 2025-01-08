import React from "react";

const ProfilePost = (value) => {
  return (
    <div>
      <div
        className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
        key={value?._id}
      >
        <div className="flex items-center space-x-4 mb-4">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={userdata?.avatar || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {userdata?.name}
            </h3>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
        <p className="text-gray-700">{value?.desc}</p>
        <img
          src={value?.files}
          alt="Post Image"
          className="w-full h-48 rounded-lg object-cover"
        />
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex gap-2 items-center">
            <span>{value?.likes?.length}</span>
            <button className="text-blue-600 hover:underline">
              {" "}
              <ThumbUpOffAltIcon />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <span>{value?.comments?.length}</span>
            <button className="text-blue-600 hover:underline">
              {" "}
              <CommentIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
