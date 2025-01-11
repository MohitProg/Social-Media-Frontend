import React, { useEffect } from "react";
import { memo, useCallback, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../redux/Slice/PostApiSlice";

import toast from "react-hot-toast";

import { CreatePostNoupdate } from "../redux/Slice/UserSlice";
import { ClipLoader } from "react-spinners";
import { ImAttachment } from "react-icons/im";
import { Button } from "./ui/button";
import { IoSend } from "react-icons/io5";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaPlus } from "react-icons/fa";
import { BsEmojiGrin } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { UpdateAllpostdata } from "@/redux/Slice/PostSlice";
import { CreateNotification } from "@/redux/Slice/NotificationApi";

const CreatePostModal = () => {
  const [showemoji, setshowEmoji] = useState(false);
  const pickerRef = useRef(null);
  const formref = useRef();
  const dispatch = useDispatch();
  const [file, setfile] = useState([]);
  const { createpoststatus } = useSelector((state) => state.post);
  const filedata = Object.keys(file).map((value) => file[value]);

  const fileref = useRef();
  const videoref = useRef();
  const [postdata, setpostdata] = useState({
    desc: "",
    files: [],
  });

  const HandleShowEmoji = (e) => {
    e.preventDefault();
    setshowEmoji(!showemoji);
  };
  const CreatePostofuser = useCallback(
    (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("desc", postdata?.desc);
      //  method to send mutiple images from frontend to backend
      for (let i = 0; i < postdata.files?.length; i++) {
        formdata.append("files", postdata.files[i]);
      }

      dispatch(CreatePost(formdata))
        .unwrap()
        .then((res) => {
          if (res.success) {
            toast.success(res.message);
            console.log(res);
            dispatch(CreatePostNoupdate(res.userupdated));
            dispatch(UpdateAllpostdata([res.CreatePost]));
            // method to create notification
            let obj = {
              name: res?.userupdated?.name,
              type: "post",
              postid: res?.CreatePost?._id,
            };
            dispatch(CreateNotification(obj));
            setpostdata({
              desc: "",
              files: [],
            });
            formref.current.reset();

            // fileref.current.value = null;
            // videoref.current.value=null;
          } else {
            toast.error(res.message);
          }
        });
    },
    [postdata, file]
  );

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
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <FaPlus size={25} />
        </DialogTrigger>
        <DialogContent className=" p-0   py-2  grid grid-cols-1  h-[80vh]  overflow-y-scroll  ">
          <div className="flex flex-col  gap-2  py-2">
            <h1 className="cmn-text text-center">Create Your Post</h1>
            <form ref={formref} className="bg-white      p-2 ">
              <div>
                <textarea
                  value={postdata?.desc}
                  onChange={(e) =>
                    setpostdata({ ...postdata, desc: e.target.value })
                  }
                  name="desc"
                  className="cmn-input w-full"
                  placeholder="What's on your mind?"
                ></textarea>

                {/* Selected Media Preview */}
                <div
                  className={`  p-1 mt-2 flex items-center h-1/2    justify-center   ${
                    file?.length > 0 ? "block" : "hidden"
                  } `}
                >
                  {file[0]?.type === "video/mp4" ? (
                    <video
                      ref={videoref}
                      className="rounded-md h-full  overflow-hidden w-full  object-contain"
                      src={
                        file
                          ? URL?.createObjectURL(file[0])
                          : "https://images.unsplash.com/photo-1720048170996-40507a45c720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
                      }
                      controls
                    >
                      <source src="" />
                    </video>
                  ) : (
                    <Carousel className="h-full  flex items-center justify-center overflow-hidden">
                      <CarouselContent>
                        {filedata &&
                          filedata.map((value) => (
                            <CarouselItem
                              key={value?.name}
                              className="w-full flex items-center  outline-1 outline-[#c0bcbccc] rounded-lg justify-center shadow-lg"
                            >
                              <img
                                src={
                                  value
                                    ? URL?.createObjectURL(value)
                                    : "https://images.unsplash.com/photo-1720048170996-40507a45c720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
                                }
                                className="object-contain rounded-md  w-full  "
                                alt=""
                              />
                            </CarouselItem>
                          ))}
                      </CarouselContent>

                      {filedata?.length > 0 && (
                        <>
                          <CarouselPrevious className="flex items-center justify-center p-3 bg-[#c0bcbccc] left-0" />
                          <CarouselNext className="flex items-center justify-center p-3 bg-[#c0bcbccc] right-0" />
                        </>
                      )}
                    </Carousel>
                  )}
                </div>
              </div>

              {/* Upload Image/Video Section */}
              <div className={` flex items-center justify-between  `}>
                <div className=" flex gap-3 items-center  cursor-pointer relative ">
                  <span
                    className="cmn-file"
                    onClick={() => fileref.current.click()}
                  >
                    <ImAttachment className="cmn-text" />
                  </span>

                  <input
                    name="files"
                    multiple
                    onChange={(e) => {
                      setfile(e.target.files),
                        setpostdata({ ...postdata, files: e.target.files });
                    }}
                    type="file"
                    ref={fileref}
                    className="hidden"
                    accept="image/*,video/*"
                  />

                  <button className="cmn-file " onClick={HandleShowEmoji}>
                    <BsEmojiGrin className="cmn-text " />
                  </button>
                  <div className=" absolute top-7 w-full">
                    {showemoji && (
                      <div className=" " ref={pickerRef}>
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji) =>
                            setpostdata({
                              ...postdata.files,
                              desc: postdata?.desc + emoji.native,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={CreatePostofuser}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    {createpoststatus === "pending" ? (
                      <ClipLoader size="20px" loading={true} color="#ffffff" />
                    ) : (
                      <IoSend />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePostModal;
