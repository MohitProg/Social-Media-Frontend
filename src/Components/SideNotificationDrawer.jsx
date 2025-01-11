import React, { useEffect } from "react";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import { ReadNotification } from "@/redux/Slice/NotificationApi";
import { Link } from "react-router-dom";
import { useSocketConext } from "@/Context/SocketContext";
import { UpdateNotification } from "@/redux/Slice/NotificationSlice";
import toast from "react-hot-toast";

const SideNotificationDrawer = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketConext();
  const { getnotstatus, notificationdata } = useSelector(
    (state) => state.notification
  );

  // console.log(notificationdata);
  let countfornotification = notificationdata.filter(
    (value) => value?.isRead === false
  );

  const HandleReadNotification = (value) => {
    try {
      dispatch(ReadNotification(value?._id));
    } catch (error) {}
  };

  useEffect(() => {
    socket.on("sendpostNotification", (data) => {
      toast.success(data?.message);
      console.log(data);
      dispatch(UpdateNotification(data));
    });

    socket.on("likenotification", (data) => {
      toast.success(data?.message);
      console.log(data);
      dispatch(UpdateNotification(data));
    });

    socket.on("commentNotification", (data) => {
      toast.success(data?.message);
      console.log(data);
      dispatch(UpdateNotification(data));
    });

    socket.on("follownotification", (data) => {
      toast.success(data?.message);
      console.log(data);
      dispatch(UpdateNotification(data));
    });
  }, [socket]);
  return (
    <div>
      <Sheet>
        <SheetTrigger className="flex  gap-2 items-center text-sm">
          {" "}
          <div className="relative   text-sm">
            <IoMdNotificationsOutline size={25} />
            {countfornotification?.length > 0 && (
              <span className="bg-red-500 absolute top-0 left-0  w-4  h-4  flex items-center justify-center text-white text-xs rounded-full ">
                {countfornotification?.length}
              </span>
            )}
          </div>
          Notification
        </SheetTrigger>
        <SheetContent side={"left"} className="w-full overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Notification</SheetTitle>
          </SheetHeader>

          <div className="mt-3">
            {getnotstatus == "pending" ? (
              <div className="h-full flex items-center justify-center">
                <ClipLoader />
              </div>
            ) : notificationdata?.length > 0 ? (
              <div className="flex-col flex gap-5 ">
                {notificationdata?.map((value) => (
                  <>
                    <Link to={`/singlepost/${value?.postId}`}>
                      <SheetClose className="w-full">
                        <div
                          onClick={() => HandleReadNotification(value)}
                          className={`w-full hover:bg-[#cdc9c9] flex items-end justify-between  p-2 rounded-md  cmn-text  ${
                            value?.isRead ? "bg-gray-200" : "bg-blue-300"
                          }`}
                        >
                          <div className="flex flex-col gap-1   flex-1">
                            <div
                              className=" text-sm sm:text-md text-start"
                              dangerouslySetInnerHTML={{
                                __html: value?.message,
                              }}
                            ></div>
                            <span className=" text-black sm:text-sm text-start">
                              type:{value?.nottype}
                            </span>
                          </div>

                          <span className="cmn-text text-xs   ">
                            {moment(value?.createdAt).fromNow()}
                          </span>
                        </div>
                      </SheetClose>
                    </Link>
                  </>
                ))}
              </div>
            ) : (
              <div>
                <h1>You dont have any Notification</h1>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideNotificationDrawer;
