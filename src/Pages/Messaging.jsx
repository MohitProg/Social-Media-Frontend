import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const Messaging = () => {
  const { userdata } = useSelector((state) => state.user);

  return (
    <>
      <section className="sm:w-[80%] mx-auto grid sm:grid-cols-4 h-[90vh] bg-white mt-3 gap-2 p-3 rounded-lg">
        <div className="">
          <h1 className="cmn-text text-sm">Your Guppy Friends</h1>

          {/* users list  */}
          <div className="mt-2 flex flex-col gap-1">
            {/* user item  */}
            {userdata?.Following?.map((value) => (
              <Link  to={":id"}>
              <div className=" w-full p-1  hover:bg-[#cdc9c9] rounded-md flex items-start  justify-between gap-2  ">
                <Avatar>
                  <AvatarImage src={value?.avatar} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex items-start   flex-col  leading-tight  flex-1">
                  <h1 className="text-sm">{value?.name}</h1>
                  <span className="cmn-text text-xs">last message</span>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full hidden md:block col-span-3">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Messaging;
