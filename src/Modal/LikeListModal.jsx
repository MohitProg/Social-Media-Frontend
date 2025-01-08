
import React from "react";
import { Link } from "react-router-dom";
import { AvatarGroup } from "@mui/material";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const LikeListModal = ({ value }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center gap-2">
          <div onClick={() => setopen(true)}>
            <AvatarGroup max={4} total={value?.likes?.length}>
              {value?.likes?.length > 0 &&
                value?.likes?.map((value, index) => (
                  <>
                    <Avatar key={index} className="h-8 w-8">
                      <AvatarImage src={value?.avatar} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </>
                ))}
            </AvatarGroup>
          </div>

          <span className="cmn-text text-xs">{value?.likes?.length} likes</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>People who like your post</DialogTitle>
          </DialogHeader>

          {value?.likes && value?.likes?.length > 0 ? (
            value?.likes?.map((value) => (
              <div
                key={value._id}
                className="flex items-center w-full justify-between mb-4"
              >
                <Link
                  to={`/profile/singleuserdata/${value?._id}`}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={
                      value?.avatar ||
                      "https://plus.unsplash.com/premium_photo-1681426472026-60d4bf7b69a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D"
                    }
                    alt="Suggested User"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {value?.name}
                    </h3>
                    <p className="text-xs text-gray-500">{value?.email}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <>
              <div className="cmn-text">
                <h1>You don't have any like please share your post </h1>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LikeListModal;
