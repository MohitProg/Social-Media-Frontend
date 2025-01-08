import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignupUser } from "../redux/Slice/UserApicall.js";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Button } from "@/Components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookSquare } from "react-icons/bi";

const Signup = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { singupstatus } = useSelector((state) => state.user);

  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", userdata.name);
    formdata.append("email", userdata.email);
    formdata.append("password", userdata.password);
    dispatch(SignupUser(formdata))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);

          Navigate("/login");
        } else {
          toast.error(res.message);
        }
      });
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:8000/api/v1/user/auth/google";
    } catch (error) {
      console.error("Login error: ", error);
    }
  };
  return (
    <>
      <div className="cmn-bg itemcenter h-screen p-2">
        <div className="bg-white p-4 w-full sm:w-2/3 md:w-1/4 ">
          <h2 className="text-3xl font-semibold text-center text-black ">
            Create Account
          </h2>
          <form
            onSubmit={handleSignupSubmit}
            className="w-full mt-2   flex flex-col gap-3  rounded-md sm:shadow-md"
          >
            <div className="cmn-text flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="name"
                value={userdata?.name || ""}
                onChange={(e) =>
                  setuserdata({ ...userdata, name: e.target.value })
                }
                id="username"
                placeholder="Your Username"
                className="  cmn-input   "
                required
              />
            </div>
            <div className="cmn-text flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userdata?.email || ""}
                onChange={(e) =>
                  setuserdata({ ...userdata, email: e.target.value })
                }
                placeholder="you@example.com"
                className="  cmn-input "
                required
              />
            </div>
            <div className="cmn-text flex flex-col gap-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={userdata?.password || ""}
                onChange={(e) =>
                  setuserdata({ ...userdata, password: e.target.value })
                }
                placeholder="********"
                className="cmn-input w-full"
                required
              />
            </div>

            <Button type="submit" className="bg-blue-500  hover:bg-blue-600">
              {singupstatus === "pending" ? (
                <ClipLoader size="20px" color="#ffffff" loading={true} />
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <div className="flex justify-between items-center mt-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-600">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="mt-4 flex flex-col gap-2 ">
            <Button className="w-full " onClick={handleGoogleLogin}>
              <FcGoogle className="" /> Google
            </Button>
            <Button className="w-full">
              <BiLogoFacebookSquare className="text-blue-500" /> Facebook
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
