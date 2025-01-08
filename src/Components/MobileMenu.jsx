import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineHome } from "react-icons/ai";

import { TbMessageCircle } from "react-icons/tb";

import { Link } from "react-router-dom";
import SideNotificationDrawer from "./SideNotificationDrawer";
const MobileMenu = ({ setopenMobileMenu, openMobileMenu }) => {
  return (
    <>
      <Sheet open={openMobileMenu}>
        <SheetContent side={"left"} className="w-[300px] sm:w-[540px] p-2">
          <SheetTitle>WebTech Blog</SheetTitle>

          <div className="  flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setopenMobileMenu(false)}
              className="cmn-link"
            >
              
              <AiOutlineHome size={25} className="" /> Home
            </Link>
            <Link
              onClick={() => setopenMobileMenu(false)}
              to="message/:id"
              className="cmn-link"
            >
              <TbMessageCircle size={25} /> Chats
            </Link>

            <div className="cmn-link gap-2">
              <SideNotificationDrawer />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileMenu;
