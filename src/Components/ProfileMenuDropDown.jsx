import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutuser } from "@/redux/Slice/UserApicall";

const ProfileMenuDropDown = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.user);
  console.log(userdata);

  const LogoutUserfromweb = () => {
    dispatch(LogOutuser())
      .unwrap()
      .then((res) => {
        if (res.success) {
          localStorage.removeItem("auth-token");
          localStorage.removeItem("userid");
          localStorage.clear();
          sessionStorage.clear();

          window.location.reload();
          toast.success(res.message);
        } else {
          localStorage.clear();
          toast.success(res.message);
          window.location.reload();
        }
      });
  };

  const handleNaviagte = (link) => {
    Navigate(link);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="border-none outline-none">
          <button variant="outline " className="">
            {" "}
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={userdata?.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="w-full ">
            <button
              className="cmn-link w-full"
              onClick={() =>
                handleNaviagte(`profile/${localStorage.getItem("userid")}`)
              }
            >
              Profile
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem className="w-full ">
            <button
              className="cmn-link w-full"
              onClick={() => handleNaviagte("setting")}
            >
              Settings
            </button>{" "}
          </DropdownMenuItem>

          <DropdownMenuItem className="w-full">
            {" "}
            <button className="cmn-link w-full" onClick={LogoutUserfromweb}>
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenuDropDown;
