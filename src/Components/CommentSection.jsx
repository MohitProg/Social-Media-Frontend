import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { BsEmojiGrin } from "react-icons/bs";
import {
  DeleteComment,
  GetComment,
  PostComment,
} from "../redux/Slice/CommentApislice";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { AiOutlineSend } from "react-icons/ai";
import Picker from "@emoji-mart/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegComment } from "react-icons/fa";
import moment from "moment";
import { Button } from "./ui/button";
import data from "@emoji-mart/data";
const CommentSection = ({ value }) => {
    const pickerRef = useRef(null);
  const { postcommentdata, getcommentstatus } = useSelector(
    (state) => state.comment
  );

  // console.log(postcommentdata)
  // console.log(value);
  const dispatch = useDispatch();
  //  state for reply to comment in comment section
  const [reply, setreply] = useState({
    id: "",
    bol: "",
  });
  const [showemoji, setshowEmoji] = useState(false);
  //  state for comment section
  const [messagedata, setmessagedata] = useState({
    message: "",
    postId: "",
  });

  // console.log(messagedata);
  const HandleSubmit = () => {
    setmessagedata({ ...messagedata, message: "" });

    dispatch(PostComment(messagedata))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        }
      });
  };

  const hanldeDelete = (comment) => {
    dispatch(DeleteComment(comment))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        }
      });
  };

  // console.log(postcommentdata);
  console.log(messagedata)

  useEffect(() => {
    setmessagedata({ ...messagedata, postId: value?._id });
  }, [value]);

  //   useEffect(() => {

  //     dispatch(GetComment(value?._id));

  // }, [value._id]);

    useEffect(() => {
      const HandleClickOutSide = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
          setshowEmoji(false);
        }
      };
  
      document.addEventListener("mousedown", HandleClickOutSide);
      return () => {
        document.removeEventListener("mousedown", HandleClickOutSide);
      };
    });
  const HandleShowEmoji = (e) => {
    e.preventDefault();
    setshowEmoji(!showemoji);
  };

  const HandleGetComments = (postid) => {
    if (postid) {
      dispatch(GetComment(postid));
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger onClick={() => HandleGetComments(value?._id)}>
          {" "}
          <FaRegComment size={20} />
        </DialogTrigger>
        <DialogContent className="p-2 w-[90%] rounded-md sm:w-[100%]">
          <DialogHeader>
            <DialogTitle>Comments On your Post</DialogTitle>
          </DialogHeader>

          <div className="">
            {getcommentstatus === "pending" ? (
              <div className=" h-[50vh]   flex items-center justify-center p-3">
                <ClipLoader size={"20px"} />
              </div>
            ) : (
              <>
                {/* Comments Section */}
                <div className="sm:p-3 rounded-xl bg-white overflow-y-scroll  flex flex-col gap-2  h-[50vh]">
                  {postcommentdata?.length > 0 ? (
                    <>
                      {postcommentdata?.map((value) => (
                        <div key={value?._id} className=" flex flex-col ">
                          <div className="flex justify-between items-center ">
                            <div className="flex gap-2 items-center">
                              <Avatar>
                                <AvatarImage src={value?.senderId?.avatar} />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div className="cmn-text leading-tight ">
                                <span className="font-semibold text-sm sm:text-base cmn-text ">
                                  {value?.senderId?.name}
                                </span>
                                <p className="cmn-text">{value?.text}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 items-center">
                              <span className="cmn-text text-[10px] sm:text-sm">
                                {moment(value?.createdAt).startOf().fromNow()}
                              </span>
                              {localStorage.getItem("userid") ===
                                value?.senderId?._id && (
                                <button
                                  onClick={() => hanldeDelete(value)}
                                  className="cmn-text cmn-link"
                                >
                                  {/* <DeleteIcon /> */}
                                  <MdDeleteOutline size={17} />

                                  {/* d */}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Reply Section */}
                          <div className="w-full  ">
                            <div className="flex items-center   px-2">
                              <span className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition">
                                {value?.likes}{" "}
                                {/* <ThumbUpOffAltIcon fontSize="small" /> */}
                                <FaRegHeart size={12} />
                              </span>
                              <button
                                onClick={() =>
                                  setreply({
                                    id: value?._id,
                                    bol: !reply.bol,
                                  })
                                }
                                className="cmn-link text-[10px] sm:text-sm  cmn-text bg-transparent p-0"
                              >
                                Reply
                              </button>
                            </div>

                            {/* Reply Input */}
                            <div
                              className={`${
                                reply?.bol && reply?.id === value?._id
                                  ? "flex"
                                  : "hidden"
                              } w-full mt-3 flex gap-3 items-center`}
                            >
                              <input
                                type="text"
                                placeholder="Write a reply..."
                                className="w-full px-3 py-2 placeholder:text-sm bg-gray-50 rounded-lg outline-none transition duration-200"
                              />
                              <button className="text-purple-500 hover:text-blue-500 transition duration-300">
                                <AiOutlineSend size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <h1 className="cmn-text">No Comment Available</h1>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Input Section */}
            <div className="w-full mt-4 flex gap-2 items-center">
              <button className="cmn-file hidden md:block " onClick={HandleShowEmoji}>
                <BsEmojiGrin className="cmn-text " />
              </button>

              <div className=" absolute top-2 w-full">
                {showemoji && (
                  <div className=" " ref={pickerRef}>
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji) =>
                        setmessagedata({
                        ...messagedata,
                          message: messagedata?.message + emoji.native,
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <input
                type="text"
                value={messagedata.message}
                onChange={(e) =>
                  setmessagedata({
                    ...messagedata,
                    message: e.target.value,
                  })
                }
                placeholder="Enter your comment"
                className="cmn-input w-full"
              />
              <Button
                onClick={HandleSubmit}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <AiOutlineSend size={20} />
              </Button>
            </div>

            <hr className="border-1 border-purple-500 mt-4" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentSection;
