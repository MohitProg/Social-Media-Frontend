import React, { memo, useCallback, useEffect, useState } from "react";
import Newpost from "../Components/Newpost";
import CreateNewpost from "../Components/CreateNewpost";
import { useDispatch, useSelector } from "react-redux";

import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { FollowUser } from "../redux/Slice/UserApicall";
import { UpdateAlluserdata } from "../redux/Slice/UserSlice";
import { Link } from "react-router-dom";

import { UpdateAllpostdata } from "../redux/Slice/PostSlice";
import { FaPlus } from "react-icons/fa";
import CreatePostModal from "@/Components/CreatePostModal";
import UserSuggestion from "@/Components/UserSuggestion";

const Home = () => {
  const token = localStorage.getItem("auth-token");

  const { Allpostdatatoviewuser, allpoststatus } = useSelector(
    (state) => state.post
  );


  console.log(allpoststatus)
  return (
    <>
      {/* <!-- Home Page Layout --> */}
      <div className="cmn-bg min-h-screen  relative  w-full sm:w-[90%] mx-auto   sm:p-5">
        <div className="  grid grid-cols-1 lg:grid-cols-3  gap-8">
          {/* <!-- Main Content (Posts Feed) --> */}
          <div className="lg:col-span-2">
            <div className="hidden sm:block">
              <CreateNewpost />
            </div>

            <div className="fixed sm:hidden bottom-2 right-2 p-2 flex items-center justify-center bg-[#c0bcbccc] rounded-full  ">
              <CreatePostModal />
            </div>

            {/* <!-- Posts Feed --> */}

            {allpoststatus === "pending" ? (
              <div className="flex w-full  h-screen items-center  justify-center  ">
                <ClipLoader />
              </div>
            ) : <>
                <div className="flex flex-col gap-4">
                  {Allpostdatatoviewuser &&
                    Allpostdatatoviewuser?.length > 0 &&
                    Allpostdatatoviewuser?.map((value) => (
                      <Newpost key={value?._id} value={value} />
                    ))}
                </div>
              </> ? (
              <div className="flex flex-col gap-1 bg-white rounded-lg items-center justify-center h-screen w-full">
                <h1 className="cmn-text">NO Post Available &#128532; </h1>
                <p className="cmn-text text-sm">Please follow some user</p>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* <!-- Sidebar --> */}
          <div className="lg:col-span-1  flex flex-col gap-5">
            {/* <!-- Suggested Users to Follow --> */}
            <div className="bg-white shadow-md rounded-lg p-6 ">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Suggested for You
              </h2>

              <UserSuggestion />
            </div>

            {/* <!-- Online Friends Section --> */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Online Friends
              </h2>

              <div className="flex items-center space-x-3 mb-4">
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-400"
                  src="https://via.placeholder.com/100"
                  alt="Online Friend"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Anna Johnson
                  </h3>
                  <p className="text-xs text-gray-500">Active Now</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-400"
                  src="https://via.placeholder.com/100"
                  alt="Online Friend"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Michael Brown
                  </h3>
                  <p className="text-xs text-gray-500">Active Now</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-400"
                  src="https://via.placeholder.com/100"
                  alt="Online Friend"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Sarah Williams
                  </h3>
                  <p className="text-xs text-gray-500">Active Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
