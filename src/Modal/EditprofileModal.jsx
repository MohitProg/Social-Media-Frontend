
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "../redux/Slice/UserApicall";
import toast from "react-hot-toast";
import { UpdateUserState } from "../redux/Slice/UserSlice.js";
import { FaEdit } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { ClipLoader } from "react-spinners";
const EditprofileModal = ({ editmodal, seteditmodal }) => {
  const { userdata, getuserstatus, updateuserstatus } = useSelector(
    (state) => state.user
  );
  const [file, setfile] = useState("");
  const fileref = useRef();
  const dispatch = useDispatch();

  const [edituserdata, setedituserdata] = useState({
    name: "",
    desc: "",
    avatar: "",
  });

  useEffect(() => {
    if (userdata !== undefined) {
      setedituserdata({
        name: userdata?.name,
        desc: userdata?.desc,
        avatar: userdata?.avatar,
      });
    }
  }, [getuserstatus, userdata]);

  console.log(edituserdata?.avatar);

  const UpdateUserdata = () => {
    const formdata = new FormData();
    formdata.append("name", edituserdata.name);
    formdata.append("desc", edituserdata.desc);
    formdata.append("avatar", edituserdata.avatar);
    dispatch(UpdateUser(formdata))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          seteditmodal(false);
          dispatch(UpdateUserState(res.updateuser));
        } else {
          toast.error(res.message);
        }
      });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <FaEdit />
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="p-3">
          <DialogHeader>
            <DialogTitle>Edit Your Profile </DialogTitle>
          </DialogHeader>

          {/* <!-- Profile Picture Upload --> */}
          <div className="flex items-center   gap-5 ">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={file ? file : edituserdata?.avatar}
                alt="@shadcn"
              />
              <AvatarFallback>wait</AvatarFallback>
            </Avatar>

            <input
              ref={fileref}
              type="file"
              onChange={(e) => {
                setedituserdata({
                  ...edituserdata,
                  avatar: e.target.files[0],
                }),
                  setfile(URL.createObjectURL(e.target.files[0]));
              }}
              className="hidden"
            />
            <Button
              onClick={() => fileref.current.click()}
              className="flex   bg-transparent text-black hover:text-white hover:bg-blue-600  items-center"
            >
              <LuUpload /> upload
            </Button>
          </div>

          {/* <!-- Form Fields --> */}
          <form className="space-y-4">
            {/* <!-- Name Input --> */}
            <div>
              <label htmlFor="name" className="cmn-text">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={edituserdata?.name}
                onChange={(e) =>
                  setedituserdata({ ...edituserdata, name: e.target.value })
                }
                className="cmn-input w-full"
                placeholder="Enter Your Name"
              />
            </div>

            {/* <!-- Bio Input --> */}
            <div>
              <label htmlFor="bio" className="cmn-text">
                Bio
              </label>
              <textarea
                id="bio"
                name="desc"
                rows="3"
                value={edituserdata?.desc || ""}
                onChange={(e) =>
                  setedituserdata({ ...edituserdata, desc: e.target.value })
                }
                className="cmn-input w-full"
                placeholder="Tell us something about yourself"
              ></textarea>
            </div>

            {/* <!-- Save Button --> */}
            <div className="flex justify-end">
            
                <Button
                  onClick={UpdateUserdata}
                  type="button"
                  className="bg-blue-500 flex items-center justify-center hover:bg-blue-600"
                >
                    {updateuserstatus === "pending" ? (
                <ClipLoader  size="20px" color="#ffffff" loading={true}/>

              ) : (

                "  Save Changes"
              )}
                </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditprofileModal;
