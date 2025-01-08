import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../redux/Slice/PostApiSlice";

import toast from "react-hot-toast";

import { CreatePostNoupdate } from "../redux/Slice/UserSlice";
import { ClipLoader } from "react-spinners";
import { ImAttachment } from "react-icons/im";
import { Button } from "./ui/button";
import { IoSend } from "react-icons/io5";
import { BsEmojiGrin } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CreateNewpost = () => {
  //  state for emoji showing

  const [showemoji, setshowEmoji] = useState(false);
  console.log(showemoji)
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

  // close picker if we close outside of it 
  useEffect(()=>{
    const handleOutside=(event)=>{
      if(pickerRef.current && !pickerRef.current.contains(event.target)){
        setshowEmoji(false)
      }
    }

    document.addEventListener("mousedown",handleOutside);
    return ()=>{
      document.removeEventListener("mousedown",handleOutside)
    }

  },[])

  return (
    <>
      <div className=" mb-3">
        <form
          ref={formref}
          className="bg-white  flex flex-col gap-3 shadow-md rounded-lg  p-5"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Create a New Post
          </h2>

          <textarea
            value={postdata?.desc}
            onChange={(e) => setpostdata({ ...postdata, desc: e.target.value })}
            name="desc"
            className="cmn-input w-full"
            placeholder="What's on your mind?"
          ></textarea>

          {/* Selected Media Preview */}
          <div
            className={` p-1 mt-2 flex items-center justify-center  ${
              file !== "" ? "block" : "hidden"
            } `}
          >
            {file[0]?.type === "video/mp4" ? (
              <video
                ref={videoref}
                className="rounded-md overflow-hidden w-full h-72 object-contain"
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
              <Carousel>
                <CarouselContent>
                  {filedata &&
                    filedata.map((value) => (
                      <CarouselItem
                        key={value?.name}
                        className="w-full flex items-center justify-center shadow-lg"
                      >
                        <img
                          src={
                            value
                              ? URL?.createObjectURL(value)
                              : "https://images.unsplash.com/photo-1720048170996-40507a45c720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
                          }
                          className="object-cover rounded-md overflow-hidden w-full  "
                          alt=""
                        />
                      </CarouselItem>
                    ))}
                </CarouselContent>

                {file?.length > 1 && (
                  <CarouselPrevious className="flex items-center justify-center p-3 bg-[#c0bcbccc] left-0" />
                )}

                {file?.length > 1 && (
                  <CarouselNext className="flex items-center justify-center p-3 bg-[#c0bcbccc] right-0" />
                )}
              </Carousel>
            )}
          </div>

          {/* Upload Image/Video Section */}
          <div className={` flex items-center justify-between  `}>
            <div className=" flex gap-3 items-center  cursor-pointer">
              <span
                className="cmn-file"
                onClick={(e) => fileref.current.click()}
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

              <div className=" relative">
                <button className="cmn-file " onClick={HandleShowEmoji}>
                  <BsEmojiGrin className="cmn-text " />
                </button>

                {showemoji && (
                  <div ref={pickerRef}  className="absolute top-7 w-full z-[999]">
                    <Picker
                      data={data}
                      className="z-[999]"
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
    </>
  );
};

export default memo(CreateNewpost);
