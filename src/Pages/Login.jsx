import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../redux/Slice/UserApicall";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/Components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { Base_Url } from "../../constant";
const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loginstatus } = useSelector((state) => state.user);

  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("email", userdata?.email);
    formdata.append("password", userdata?.password);
    dispatch(LoginUser(formdata))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          Navigate("/");
        } else {
          toast.error(res?.message);
        }
      });
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    try {
      window.location.href = `${Base_Url}/api/v1/user/auth/google`;
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <>
      <div className="cmn-bg itemcenter h-screen p-2">
        <div className="bg-white p-4 w-full sm:w-2/3 md:w-1/4 ">
          <h2 className="text-3xl font-semibold text-center text-black ">
            Welcome Back
          </h2>
          <form
            onSubmit={handleLoginSubmit}
            className="w-full mt-2   flex flex-col gap-3  rounded-md sm:shadow-md"
          >
            <div className=" cmn-text flex flex-col gap-2">
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
                className="  cmn-input   "
                required
              />
            </div>
            <div className="cmn-text flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userdata?.password || ""}
                onChange={(e) =>
                  setuserdata({ ...userdata, password: e.target.value })
                }
                placeholder="********"
                className="cmn-input"
                required
              />
            </div>
            <Button className="bg-blue-500  hover:bg-blue-600">
              {loginstatus === "pending" ? (
                <ClipLoader size="20px" color="#ffffff" loading={true} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          <div className="flex justify-between items-center mt-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-600">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="mt-4 flex flex-col gap-2 ">
            <Button onClick={handleGoogleLogin} className="w-full ">
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

export default Login;
