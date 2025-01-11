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
import { useSocketConext } from "@/Context/SocketContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Home = () => {
  const token = localStorage.getItem("auth-token");
  // online user according to filter
  const [userOnline, setUserOnline] = useState([]);
  const { onlineuser, socket } = useSocketConext();
  const { userStatus } = useSelector((state) => state.user);

  const { Allpostdatatoviewuser, allpoststatus } = useSelector(
    (state) => state.post
  );

  const { userdata } = useSelector((state) => state.user);
  console.log(userdata?.Following, "userdata");

  useEffect(() => {
    if (userdata?.Following && onlineuser) {
      const user = userdata.Following.filter((value) =>
        onlineuser.some((user) => user === value?._id)
      );

      setUserOnline(user);
    } else {
      setUserOnline([]);
    }
  }, [onlineuser, socket, userStatus, userdata]);



  return (
    <>
      {/* <!-- Home Page Layout --> */}
      <div className="cmn-bg min-h-screen  relative   w-full sm:w-[70%] mx-auto   sm:p-5">
        <div className="  grid grid-cols-1 lg:grid-cols-3    gap-8">
          {/* <!-- Main Content (Posts Feed) --> */}
          <div className="lg:col-span-2 ">
            <div className="bg-white  flex p-2 mb-2 shadow-sm rounded-lg items-center gap-2 ">
              {userOnline?.length > 0 &&
                userOnline?.map((value) => (
                  <div className="flex flex-col gap-1" key={value?._id}>
                    <Avatar className="h-14 w-14 ring-4 ring-green-600">
                      <AvatarImage src={value?.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-xs"> {value?.name}</span>
                  </div>
                ))}
            </div>
            <div className="hidden sm:block">
              <CreateNewpost />
            </div>

            <div className="fixed sm:hidden bottom-2 right-2 p-2 z-[999] flex items-center justify-center text-white bg-[#0a0a0a9e] rounded-full  ">
              <CreatePostModal />
            </div>

            {/* <!-- Posts Feed --> */}

            {allpoststatus === "pending" ? (
              <div className="flex w-full h-screen items-center justify-center">
                <ClipLoader />
              </div>
            ) : Allpostdatatoviewuser?.length > 0 ? (
              <div className="flex flex-col gap-4 ">
                {Allpostdatatoviewuser.map((value) => (
                  <Newpost key={value?._id} value={value} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-1 bg-white rounded-lg items-center justify-center h-screen w-full">
                <h1 className="cmn-text">NO Post Available &#128532;</h1>
                <p className="cmn-text text-sm">Please follow some user</p>
              </div>
            )}
          </div>

          {/* <!-- Sidebar --> */}
          <div className="lg:col-span-1  flex flex-col gap-5 ">
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
