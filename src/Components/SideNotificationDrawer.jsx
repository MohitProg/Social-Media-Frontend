import React from "react";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SideNotificationDrawer = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="flex items-center gap-2 justify-center">
          {" "}
          <IoMdNotificationsOutline size={25} /> Notification
        </SheetTrigger>
        <SheetContent side={"left"} className="w-full">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideNotificationDrawer;
