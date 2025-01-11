import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  GetAlluser,
  Getuserdata,
  LogOutuser,
} from "../redux/Slice/UserApicall";
import { Getallpostdata, Getuserpost } from "../redux/Slice/PostApiSlice";

import toast from "react-hot-toast";
import SideNotificationDrawer from "./SideNotificationDrawer";
import { TbMessageCircle } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import MobileMenu from "./MobileMenu";
import ProfileMenuDropDown from "./ProfileMenuDropDown";
import { Apicall, Base_Url } from "../../constant";
import { GetNotification } from "@/redux/Slice/NotificationApi";

const Navbar = () => {
  const dispatch = useDispatch();
  const userId = new URLSearchParams(window.location.search).get("userid");

  // state for open mobile menu here
  const [openMobileMenu, setopenMobileMenu] = useState(false);

  const token = localStorage.getItem("auth-token");
  const loginuserid = localStorage.getItem("userid");
  const Navigate = useNavigate();

  const { getuserstatus, userdata, getalluserstatus, logoutstatus } =
    useSelector((state) => state.user);
  //  get notification data
  const { getnotstatus } = useSelector((state) => state.notification);

  //  functionality for infinite scrolling
  //  state of for page valkue
  const [pagevalue, setpagevalue] = useState(1);

  const handleScroll = () => {
    console.log(
      document.documentElement.scrollTop + window.innerHeight,
      document.documentElement.scrollHeight
    );
    if (
      document.documentElement.scrollTop + window.innerHeight + 1 >
      document.documentElement.scrollHeight
    ) {
      setpagevalue((prev) => prev + 1);
    }
  };

  // using debounce function here forexecution of infinite scroll
  const doMagic = useCallback((fun, del) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun(...args);
      }, del);
    };
  }, []);

  // doMagic(handleScroll,3000)

  useEffect(() => {
    window.addEventListener("scroll", doMagic(handleScroll, 1000));
    return () =>
      window.removeEventListener("scroll", doMagic(handleScroll, 1000));
  }, []);

  useEffect(() => {
    console.log("this is navbar");
    if (getuserstatus === "idle" && token !== null) {
      const id = localStorage.getItem("userid");
      dispatch(Getuserdata(id));
    }
    if (getalluserstatus === "idle" && token !== null) {
      dispatch(GetAlluser());
    }
  }, [getuserstatus, getalluserstatus, pagevalue, token, dispatch]);

  // getting post data to view user
  useEffect(() => {
    if (token !== null) {
      dispatch(Getallpostdata(pagevalue));
    }
  }, [pagevalue]);

  // method to get notification for a post
  useEffect(() => {
    if (getnotstatus === "idle") {
      dispatch(GetNotification(loginuserid));
    }
  }, [loginuserid, getnotstatus]);

  // useffect for google authentication
  useEffect( () => {
    if (userId !== null && userId!==undefined) {
      try {
         Apicall.post(`${Base_Url}/api/v1/user/send-token`, {
          userId: userId,
        }).then((data) => {
          console.log(data);
          localStorage.setItem("auth-token", data.data.token);
          localStorage.setItem("userid", userId);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [userId]);

  return (
    <>
      <header className="   w-full shadow-md bg-white  ">
        <nav className="  w-full   md:w-[90%] mx-auto p-2 sm:p-3">
          <div className=" flex items-center gap-3   sm:gap-5">
            <div className=" hidden sm:block text-black text-2xl font-semibold">
              <a href="#">Webtech</a>
            </div>

            <div className="  w-full sm:flex-1   hover:bg-[#f3f3f3] rounded-full ml-4  p-2 flex items-center gap-2   outline-none border-2 focus:border-black border-[#aaaaaa]  text-gray-700">
              <CiSearch size={20} />

              <input
                type="text"
                className="w-full outline-none placeholder:text-gray-500"
                placeholder="Search..."
              />
            </div>

            <div className=" hidden   sm:flex-1  lg:flex  justify-end items-center space-x-6">
              <div className="  md:flex space-x-4 cmn-text sm:flex  justify-end items-center">
                <Link to="/" className="cmn-link text-sm">
                  <AiOutlineHome size={20} className="" /> Home
                </Link>
                <Link to="message/" className="cmn-link text-sm">
                  <TbMessageCircle size={20} /> Chats
                </Link>

                <Link className="cmn-link">
                  <SideNotificationDrawer />
                </Link>
              </div>
            </div>

            <div className="  flex items-center justify-end gap-2">
              <ProfileMenuDropDown />

              <button
                // onClick={() => setopenMobileMenu(true)}
                className="lg:hidden flex items-center  "
              >
                {/* <IoMdMenu size={35} /> */}
                <MobileMenu />
              </button>
            </div>
          </div>
        </nav>
      </header>
      {/* <MobileMenu
        // setopenMobileMenu={setopenMobileMenu}
        // openMobileMenu={openMobileMenu}
      /> */}
    </>
  );
};

export default memo(Navbar);
