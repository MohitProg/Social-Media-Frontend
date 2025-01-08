import { Modal } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { UnFollowUser } from "../redux/Slice/UserApicall";
import toast from "react-hot-toast";
import { AddunfollowMemberTostate } from "../redux/Slice/UserSlice";
import { Link, useLocation } from "react-router-dom";
import { UpdateAllpostonunfollow } from "../redux/Slice/PostSlice";
import { Getallpostdata } from "../redux/Slice/PostApiSlice";
import { ClipLoader } from "react-spinners";
import { MdOutlineClose } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
const UserListModals = ({ setfollwermodal, followermodal }) => {
  const { pathname } = useLocation();
  const singleuser = pathname.split("/")[2];
  console.log(singleuser);

  const { singleuserdata, userdata, unfollowuserstatus } = useSelector(
    (state) => state.user
  );

  // console.log(userdata);
  const { Following, followers } =
    singleuser !== undefined &&
    singleuser !== null &&
    singleuser === "singleuserdata"
      ? singleuserdata
      : userdata;
  const dispatch = useDispatch();

  const Unfollowuser = async (value) => {
    console.log(value);
    await dispatch(UnFollowUser(value))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          console.log(res);
          // dispatch(Getallpostdata());
          dispatch(UpdateAllpostonunfollow(res.unfollowuserpost));
          dispatch(AddunfollowMemberTostate(value));
        } else {
          toast.error(res.message);
        }
      });
  };

  const [userid, setuserid] = useState();

  return (
    <Dialog open={followermodal.bol}>
      {/* <DialogTrigger>Followers</DialogTrigger> */}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>See Your Follower List</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <DialogClose asChild>
            <button
              aria-label="Close"
              className="absolute top-1 right-2 rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <MdOutlineClose />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="">
          <div className=" ">
            {followermodal.category === "followers"
              ? followers &&
                followers?.map((value) => (
                  <div
                    key={value._id}
                    className="flex items-center justify-between mb-4"
                  >
                    <Link
                      to={`/profile/singleuserdata/${value?._id}`}
                      className="flex items-center space-x-3"
                      onClick={() =>
                        setfollwermodal({ bol: false, category: "" })
                      }
                    >
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={
                          value?.avatar ||
                          "https://plus.unsplash.com/premium_photo-1681426472026-60d4bf7b69a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D"
                        }
                        alt="Suggested User"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {value?.name}
                        </h3>
                        <p className="text-xs text-gray-500">{value?.email}</p>
                      </div>
                    </Link>
                    {/* <button className="text-blue-600 font-medium hover:underline">
                    Follow
                  </button> */}
                  </div>
                ))
              : Following &&
                Following?.map((value) => (
                  <div
                    key={value._id}
                    className="flex items-center justify-between mb-4"
                  >
                    <Link
                      to={`/profile/singleuserdata/${value?._id}`}
                      className="flex items-center space-x-3"
                      onClick={() =>
                        setfollwermodal({ bol: false, category: "" })
                      }
                    >
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={
                          value?.avatar ||
                          "https://plus.unsplash.com/premium_photo-1681426472026-60d4bf7b69a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D"
                        }
                        alt="Suggested User"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {value?.name}
                        </h3>
                        <p className="text-xs text-gray-500">{value?.email}</p>
                      </div>
                    </Link>
                    {singleuser !== "singleuserdata" && (
                      <button
                        onClick={() => {
                          Unfollowuser(value), setuserid(value?._id);
                        }}
                        className="text-blue-600 flex items-center justify-center font-medium hover:underline"
                      >
                        {unfollowuserstatus === "pending" &&
                        userid === value?._id ? (
                          <ClipLoader size="18px" color="#0753ea" />
                        ) : (
                          "Unfollow"
                        )}
                      </button>
                    )}
                  </div>
                ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserListModals;
