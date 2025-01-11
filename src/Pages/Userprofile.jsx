import React, { useState } from "react";
import EditprofileModal from "../Modal/EditprofileModal";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DeletePost, Getuserpost } from "../redux/Slice/PostApiSlice";
import toast from "react-hot-toast";
import { DeletePostdatafromstate } from "../redux/Slice/PostSlice";
import { ClipLoader } from "react-spinners";
import {
  AddunfollowMemberTostate,
  DeletePostnoupdate,
  UpdateAlluserdata,
} from "../redux/Slice/UserSlice";
import {
  FollowUser,
  Getuserdata,
  Singlewuserdata,
  UnFollowUser,
} from "../redux/Slice/UserApicall";

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Newpost from "../Components/Newpost";
import { Button } from "@/Components/ui/button";
import { CreateNotification } from "@/redux/Slice/NotificationApi";
// import { Avatar } from "@mui/material";

const Userprofile = () => {
  const { pathname } = useLocation();
  
  const [userid, setuserid] = useState();
  // const singleuser = pathname.split("/")[2];
  const singleuserexist = pathname.split("/")[2].includes("singleuserdata");
  const userId = singleuserexist
    ? pathname.split("/")[3]
    : pathname.split("/")[2];
  console.log(singleuserexist);

  const OriginalId = localStorage.getItem("userid");
  const dispatch = useDispatch();
  const {
    getuserstatus,
    userdata,
    singleuserdata,
    unfollowuserstatus,
    singleuserstatus,
  } = useSelector((state) => state.user);

 
  //  state for category toggle
  const [catToggle, setcatToggle] = useState({
    category: "posts",
    data: [],
  });

  const { Following, followers } = singleuserexist ? singleuserdata : userdata;
  // Scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(userdata);
  const { userPostdata, userpostdatastatus } = useSelector(
    (state) => state.post
  );

  const categorySwitchwithdata = (category) => {
    switch (category) {
      case "savedpost":
        setcatToggle({ category, data: [] });
        break;
      case "videos":
        setcatToggle({ category, data: [] });
        break;
      case "photos":
        setcatToggle({ category, data: [] });
        break;
      default:
        break;
    }
  };

  const handleDeletePost = (value) => {
    let readytodelete = confirm("sure do you want to delete it ");

    if (readytodelete) {
      dispatch(DeletePost(value?._id))
        .unwrap()
        .then((res) => {
          if (res.success) {
            toast.success(res.message);
            dispatch(DeletePostdatafromstate(value));
            dispatch(DeletePostnoupdate(res.userUpdated));
          } else {
            toast.error(res.message);
          }
        });
    }
  };

  // adding functionality for follow and unfollow
  // getting id for checking follow and unfollow status of user

  const [followstatus, setfollowstatus] = useState({
    bol: "",
    status: "",
  });

  const CheckFollowstatus = () => {
    const followinguserIdofloginuser = [];
    userdata?.Following?.forEach((value) => {
      followinguserIdofloginuser.push(value?._id);
    });

    const value = followinguserIdofloginuser?.includes(singleuserdata?._id);

    if (value) {
      setfollowstatus({ bol: value, status: "Unfollow" });
    } else {
      setfollowstatus({ bol: value, status: "follow" });
    }
  };
  const Unfollowuser = async (value) => {
    console.log(value);
    await dispatch(UnFollowUser(value))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          dispatch(AddunfollowMemberTostate(value));
        } else {
          toast.error(res.message);
        }
      });
  };

  const FollowingUser = async (value) => {
    await dispatch(FollowUser(value))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          dispatch(UpdateAlluserdata(value));
           dispatch(CreateNotification({name:userdata?.name,type:"follow",reciverid:value?._id}))
        } else {
          toast.error(res.message);
        }
      });
  };

  useEffect(() => {
    CheckFollowstatus();
  }, [singleuserdata, userdata]);

  useEffect(() => {
    dispatch(Getuserpost(userId));
    dispatch(Singlewuserdata(userId));
  }, [userId, dispatch]);

  return (
    <>
      {getuserstatus === "pending" || singleuserstatus === "pending" ? (
        <div className="flex items-center justify-center h-screen w-full">
          <ClipLoader />
        </div>
      ) : (
        <div className=" w-full sm:w-[80%] mx-auto mt-5">
          <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">
            {/* Profile Header */}
            <div className=" col-span-1 rounded-md gap-2">
              <div className="flex flex-col gap-2 bg-white w-full">
                <div className="flex items-center flex-col p-2 gap-2">
                  {/* Profile Picture */}
                  <div>
                    <Avatar className="h-32 w-32">
                      <AvatarImage
                        className="object-cover"
                        src={
                          singleuserexist
                            ? singleuserdata.avatar
                            : userdata?.avatar ||
                              "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Profile Info */}
                  <div className="p-2 w-full  mx-auto flex flex-col justify-center gap-4 text-center">
                    <div>
                      <h2 className=" sm:text-1xl">
                        {singleuserexist
                          ? singleuserdata?.name
                          : userdata?.name}
                      </h2>
                      <p className="cmn-text text-sm md:text-base">
                        {singleuserexist
                          ? singleuserdata?.email
                          : userdata?.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-10 sm:justify-center justify-around">
                      {/* follower modal popup */}
                      <Dialog>
                        <DialogTrigger className="text-sm sm:text-md">
                          <strong>
                            {singleuserexist
                              ? singleuserdata?.followers?.length
                              : userdata?.followers?.length || 0}
                          </strong>{" "}
                          Follower
                        </DialogTrigger>
                        <DialogContent className="p-2 py-3 h-screen sm:h-[40vh]">
                          <DialogHeader>
                            <DialogTitle>Followers</DialogTitle>

                            <div className="py-3">
                              {followers?.length > 0 ? (
                                followers?.map((value) => (
                                  <div
                                    key={value._id}
                                    className="flex items-center justify-between mb-4 border-b-2 border-[#c0bcbccc] p-1 rounded-md py-2"
                                  >
                                    <Link
                                      to={`/profile/singleuserdata/${value?._id}`}
                                      className=""
                                    >
                                      <DialogClose className="flex items-center space-x-3">
                                        <img
                                          className="w-10 h-10 rounded-full object-cover"
                                          src={
                                            value?.avatar ||
                                            "https://plus.unsplash.com/premium_photo-1681426472026-60d4bf7b69a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D"
                                          }
                                          alt="Suggested User"
                                        />
                                        <div className="text-start">
                                          <h3 className="text-sm font-semibold text-gray-900">
                                            {value?.name}
                                          </h3>
                                          <p className="text-xs text-gray-500">
                                            {value?.email}
                                          </p>
                                        </div>
                                      </DialogClose>
                                    </Link>
                                  </div>
                                ))
                              ) : (
                                <div className="w-full flex items-center justify-center">
                                  <h1 className="cmn-text">
                                    No user available
                                  </h1>
                                </div>
                              )}
                            </div>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>

                      {/* following modal popup */}
                      <Dialog>
                        <DialogTrigger  className="text-sm sm:text-md">
                          <strong>
                            {singleuserexist
                              ? singleuserdata?.Following?.length
                              : userdata?.Following?.length || 0}
                          </strong>{" "}
                          Following
                        </DialogTrigger>
                        <DialogContent className="h-screen sm:h-[40vh]">
                          <DialogHeader>
                            <DialogTitle>Following User</DialogTitle>
                          </DialogHeader>

                          <div className="py-2 h-screen">
                            {Following?.length > 0 ? (
                              Following?.map((value) => (
                                <div
                                  key={value._id}
                                  className="flex items-center justify-between mb-4 border-b-2 border-[#c0bcbccc] p-1 rounded-md py-2"
                                >
                                  <Link
                                    to={`/profile/singleuserdata/${value?._id}`}
                                  >
                                    <DialogClose className="flex items-center space-x-3">
                                      <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={
                                          value?.avatar ||
                                          "https://plus.unsplash.com/premium_photo-1681426472026-60d4bf7b69a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D"
                                        }
                                        alt="Suggested User"
                                      />
                                      <div className="text-start">
                                        <h3 className="text-sm font-semibold text-gray-900">
                                          {value?.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                          {value?.email}
                                        </p>
                                      </div>
                                    </DialogClose>
                                  </Link>

                                  {userId == OriginalId && (
                                    <button
                                      onClick={() => {
                                        Unfollowuser(value),
                                          setuserid(value?._id);
                                      }}
                                      className="text-blue-600 flex items-center justify-center font-medium hover:underline"
                                    >
                                      {unfollowuserstatus === "pending" &&
                                      userid === value?._id ? (
                                        <ClipLoader
                                          size="18px"
                                          color="#0753ea"
                                        />
                                      ) : (
                                        "Unfollow"
                                      )}
                                    </button>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="w-full flex items-center justify-center">
                                <h1 className="cmn-text">No user available</h1>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      <p className="cmn-text text-sm sm:text-md">
                        <strong>{userdata?.post?.length || 0}</strong> Posts
                      </p>
                    </div>
                    <div className="w-full  mx-auto text-sm cmn-text">
                      {userdata?.desc}
                    </div>
                  </div>
                </div>

                {/* Edit Profile Button */}
                {userId === OriginalId && (
                  <div className="flex items-center p-3 justify-center">
                    <EditprofileModal />
                  </div>
                )}

                {/* adding follow and unfollow btn */}
                {userId !== OriginalId && (
                  <div className="px-5 flex items-center justify-center">
                    {followstatus.bol === true &&
                    followstatus.status === "Unfollow" ? (
                      <Button
                        onClick={() => Unfollowuser(singleuserdata)}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => FollowingUser(singleuserdata)}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Follow
                      </Button>
                    )}
                  </div>
                )}
              </div>
              {/* Profile Menu (Tabs) */}
              <div className="bg-white shadow-md rounded-lg p-2 sm:p-4">
                <ul className="flex items-center gap-2 cmn-text">
                  <li
                    onClick={() => categorySwitchwithdata("post")}
                    className="cmn-link"
                  >
                    Posts
                  </li>

                  <li
                    onClick={() => categorySwitchwithdata("savedpost")}
                    className="cmn-link"
                  >
                    Saved
                  </li>
                </ul>
              </div>
            </div>

            {/* Profile Content */}
            <div className="col-span-1 lg:col-span-2">
              {userpostdatastatus == "pending" ? (
                <div className="flex items-center justify-center h-screen">
                  <ClipLoader />
                </div>
              ) : userPostdata?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {userPostdata.map((value) => (
                    <Newpost
                      value={value}
                      key={value?._id}
                      OriginalId={userId}
                      handleDeletePost={handleDeletePost}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full px-4 bg-white  sm:text-xl h-screen justify-center items-center flex font-semibold">
                  No Post available..
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Userprofile;
