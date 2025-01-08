import { createAsyncThunk } from "@reduxjs/toolkit";
import { Apicall } from "../../../constant";
import toast from "react-hot-toast";

//  login user
export const LoginUser = createAsyncThunk("user/login", async (formdata) => {
  try {
    const res = await Apicall.post("/user/login", formdata);

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    const { success, message } = error.response.data;
    success === false && toast.error(message);
  }
});


// signup user
export const SignupUser = createAsyncThunk("user/signup", async (formdata) => {
  try {
    const res = await Apicall.post("/user/signup", formdata);

    return res.data;
  } catch (error) {
    const { success, message } = error.response.data;
    success === false && toast.error(message);
  }
});

// update user
export const UpdateUser = createAsyncThunk("user/update", async (formdata) => {
  try {
    const res = await Apicall.put("/user/update", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    const { success, message } = error.response.data;
    success === false && toast.error(message);
  }
});

//  getuserdata
export const Getuserdata = createAsyncThunk("user/getuser", async (id) => {
  try {
    const res = await Apicall.get(`/user/getuser/${id}`);

    return res.data;
  } catch (error) {
    console.log(error.response.data);
    const { success, message } = error.response.data;
    if (success === false && message === "jwt expired") {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("userid");
    }
  }
});

export const Singlewuserdata = createAsyncThunk(
  "user/Singlewuserdata",
  async (id) => {
    try {
      const res = await Apicall.get(`/user/getuser/${id}`);

      return res.data;
    } catch (error) {
      console.log(error.response.data);
      const { success, message } = error.response.data;
      console.log("mohit ");
      if (success === false && message === "jwt expired") {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("userid");
        console.log("mohit sharma");
      }
    }
  }
);

export const GetAlluser = createAsyncThunk("user/getalluser", async () => {
  try {
    const res = await Apicall.get("/user/getalluser/");

    return res.data;
  } catch (error) {
    const { success, message } = error.response.data;
    success === false && toast.error(message);
  }
});

export const FollowUser = createAsyncThunk("user/follow", async (value) => {
  try {
    const res = await Apicall.post(`/user/follow/${value?._id}`);

    return res.data;
  } catch (error) {
    const { success, message } = error.response.data;
    success === false && toast.error(message);
  }
});

export const UnFollowUser = createAsyncThunk("user/unfollow", async (value) => {
  try {
    const res = await Apicall.delete(`/user/unfollow/${value?._id}`);

    return res.data;
  } catch (error) {
    const { success, message } = error.response.data;
    success === false && toast.error(message);
  }
});
export const LogOutuser = createAsyncThunk("user/logout", async (value) => {
  try {
    const res = await Apicall.put(`/user/logout`);
    console.log(res.data);

    return res.data;
  } catch (error) {
    const { success, message } = error.response.data;
    success === false && toast.error(message);
  }
});
