import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import { IoBookmarkOutline } from "react-icons/io5";

import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

import { PiShareFatBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";

import { LikeAndDisLike } from "../redux/Slice/PostApiSlice";
import LikeListModal from "../Modal/LikeListModal";

import { MdDeleteOutline } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentSection from "./CommentSection";
import { GetComment } from "../redux/Slice/CommentApislice";
import { CreateNotification } from "@/redux/Slice/NotificationApi";

const Newpost = ({ value, handleDeletePost, OriginalId }) => {
  const dispatch = useDispatch();
  const [likestatus, setlikestatus] = useState(false);
  const {userdata}=useSelector((state)=>state.user)
 

  const userId = localStorage.getItem("userid");

  const videoref = useRef();
  //  get comments data
  // const { postcommentdata, getcommentstatus } = useSelector(
  //   (state) => state.comment
  // );

  const LikeThepostOrDislike = (postid) => {
    dispatch(LikeAndDisLike(postid))
      .unwrap()
      .then((res) => {
        // send notification of like 
        dispatch(CreateNotification({name:userdata?.name,type:"like",postid}))
        
        setlikestatus(!likestatus);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const status = value?.likes?.some((value) => value._id === userId);

    setlikestatus(status);
  }, [value]);

  // useEffect(() => {
  //   if (commentstatus.bol && commentstatus.id == value?._id) {
  //     dispatch(GetComment(value?._id));
  //   }
  // }, [value, commentstatus]);

  return (
    <>
      <div
        className="bg-white shadow-md rounded-lg p-2 sm:p-6  border-[1px] sm:border-0 py-4 border-b-gray-400 "
        key={value?._id}
      >
        <div className="flex items-center justify-between">
          <Link
            to={`/profile/singleuserdata/${value?.postOwner?._id}`}
            className="flex items-start space-x-4 mb-4"
          >
            <Avatar>
              <AvatarImage
                src={
                  value?.postOwner?.avatar || "https://github.com/shadcn.png"
                }
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className=" text-sm sm:text-md font-semibold cmn-text">
                {value?.postOwner?.name}
              </h3>
              <p className="text-xs cmn-text">
                {moment(value?.createdAt).format("LL")}
              </p>
            </div>
          </Link>

          {OriginalId === userId && (
            <DropdownMenu>
              <DropdownMenuTrigger className="cmn-link border-none outline-none">
                {" "}
                <BsThreeDotsVertical size={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cmn-text cmn-link "
                  onClick={() => handleDeletePost(value)}
                >
                  <MdDeleteOutline size={25} /> Delete
                </DropdownMenuItem>
                <DropdownMenuItem className="cmn-text cmn-link" size={25}>
                  <FaRegEdit size={25} /> Update
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* {OriginalId === userId && (
            <button
              className="cmn-link"
              onClick={() => handleDeletePost(value)}
            >

              <MdDeleteOutline size={25} />
            </button>
          )} */}
        </div>
        <p className="cmn-text text-md sm:text-base ">{value?.desc}</p>

        {/* Image Field for Post */}
        <div className="my-4 w-full ">
          <Carousel>
            <CarouselContent>
              {value?.files &&
                value?.files?.map((value) => (
                  <CarouselItem className="w-full" key={value}>
                    {value?.includes("video") ? (
                      <video
                        ref={videoref}
                        onScrollCapture={() => videoref.current.play()}
                        className=" mx-auto rounded-lg object-fit"
                        controls
                        src={value}
                      >
                        <source src={value} />
                      </video>
                    ) : (
                      <img
                        src={value}
                        alt="Post Image"
                        className="w-full   object-contain mx-auto rounded-lg   "
                      />
                    )}
                  </CarouselItem>
                ))}
            </CarouselContent>
            {value?.files?.length > 1 && (
              <CarouselPrevious className="flex items-center justify-center p-3 bg-[#c0bcbccc] left-0" />
            )}

            {value?.files?.length > 1 && (
              <CarouselNext className="flex items-center justify-center p-3 bg-[#c0bcbccc] right-0" />
            )}
          </Carousel>
        </div>

        {/* Like, Comment, and Share Section */}
        <div className="mt-4">
          <div className="flex items-center justify-start  cmn-text gap-8">
            <div className="flex items-center  ">
              <button
                onClick={() => LikeThepostOrDislike(value?._id)}
                className="cmn-link"
              >
                {likestatus ? <FcLike size={20} /> : <FaRegHeart size={20} />}
              </button>

              <LikeListModal value={value} />
            </div>

            <div className="flex text-sm items-center gap-1 ">
              <button className=" flex items-center  gap-2">
                {/* <FaRegComment  size={20}/> */}
                <CommentSection
                  value={value}
                  // commentstatus={commentstatus}
                />

                {/* {value?.comments.length}{" "} */}
                {/* <span className="text-xs">Comments</span> */}
              </button>
            </div>

            <div className="flex text-sm items-center gap-1 ">
              <button className=" flex items-center  gap-2">
                <IoBookmarkOutline size={20} />
              </button>
            </div>

            <div className="flex text-sm items-center gap-1 ">
              <button className=" flex items-center  gap-2">
                <PiShareFatBold size={20} />
              </button>
            </div>
          </div>
        </div>

        {/*  comment section for comment  */}
      </div>
    </>
  );
};

export default memo(Newpost);
