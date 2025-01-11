import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { IoSend } from "react-icons/io5";

const ChatMessage = () => {
  return (
    <>
      <section className="w-full h-[90vh] mt-1 md:h-full  flex flex-col gap-2  ">
        <div className=" w-full p-1   rounded-md flex items-start  justify-between gap-2  ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex items-start   flex-col  leading-tight  flex-1">
            <h1 className="text-sm">User Name</h1>
            <span className="cmn-text text-xs">last message</span>
          </div>
        </div>

        <div className=" h-full  overflow-y-scroll felx ">
            <div className="w-full p-2  mt-2 flex items-center justify-start ">
                <span className="bg-blue-300 p-2  rounded-md text-sm  ">
                    <span>Hello</span>
                </span>
            </div>
            <div className="w-full p-2  mt-2 flex items-center justify-end ">

                <span className="bg-[#cdc9c9] p-2  rounded-md text-sm  ">
                    <span>hii</span>
                </span>
            </div>
            

        </div>

        <div className="items-center flex gap-2 ">
            <input placeholder="Enter your Message" className="cmn-input flex-1" type="text" name="" id="" />
            <Button className="bg-blue-500 hover:bg-blue-600"><IoSend />
            </Button>
        </div>
      </section>
    </>
  );
};

export default ChatMessage;
