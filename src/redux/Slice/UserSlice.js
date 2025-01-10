import { createSlice } from "@reduxjs/toolkit";
import {
  FollowUser,
  GetAlluser,
  Getuserdata,
  LoginUser,
  LogOutuser,
  SignupUser,
  Singlewuserdata,
  UnFollowUser,
  UpdateUser,
} from "./UserApicall";
import axios from "axios";

const initialState = {
  userdata: {},
  loginstatus: "idle",
  getAlluserdata: [],
  singleuserdata: {},
  updateuserstatus: "idle",
  singupstatus: "idle",
  getuserstatus: "idle",
  getalluserstatus: "idle",
  followuserstatus: "idle",
  unfollowuserstatus: "idle",
  singleuserstatus: "idle",
  logoutstatus: "idle",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    UpdateUserState: (state, action) => {
      if (action.payload) {
        state.userdata = { ...action.payload };
      } else {
        state.userdata = { ...state.singleuserdata, name, desc };
      }
    },

    UpdateAlluserdata: (state, action) => {
      const userdata = state.getAlluserdata.filter(
        (value) => value._id !== action.payload._id
      );
      state.getAlluserdata = [...userdata];
    },

    AddunfollowMemberTostate: (state, action) => {
      state.getAlluserdata = [...state.getAlluserdata, action.payload];
    },
    CreatePostNoupdate: (state, action) => {
      // const postnoupdate = [...state.userdata?.post, action.payload];

      // state.userdata = { ...state.singleuserdata, post: postnoupdate };
      state.userdata=action.payload
    },

    DeletePostnoupdate: (state, action) => {
      // let postnoupdate = JSON.parse(JSON.stringify(state.singleuserdata.post));

      // postnoupdate = postnoupdate.filter(
      //   (value) => value?._id !== action.payload._id
      // );

      // state.userdata = { ...state.singleuserdata, post: postnoupdate };
      state.userdata=action.payload;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(LoginUser.pending, (state, action) => {
        state.loginstatus = "pending";
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          console.log(action.payload)
          const { success, updateduser } = action.payload;
          if (success) {
            localStorage.setItem("auth-token", updateduser?.token);

            localStorage.setItem("userid", updateduser?._id);

            state.userdata = updateduser;
          }

          state.loginstatus = "fullfilled";
        }
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loginstatus = "rejected";
      });

    //    signup user
    builder
      .addCase(SignupUser.pending, (state, action) => {
        state.singupstatus = "pending";
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          const { success, newuser } = action.payload;
          if (success) {
            state.singleuserdata = newuser;
          }

          state.singupstatus = "fullfilled";
        }
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.singupstatus = "rejected";
      });

    // getuser by id
    builder
      .addCase(Getuserdata.pending, (state, action) => {
        state.getuserstatus = "pending";
      })
      .addCase(Getuserdata.fulfilled, (state, action) => {
        state.getuserstatus = "fullfilled";
        if (action.payload !== undefined) {
          const { success, getuser } = action.payload;
          if (success) {
            state.userdata = getuser;
          }
        }
      })
      .addCase(Getuserdata.rejected, (state, action) => {
        state.getuserstatus = "rejected";
      });

    //    update user status
    builder
      .addCase(UpdateUser.pending, (state, action) => {
        state.updateuserstatus = "pending";
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload !== undefined) {
          const { success, updateuser } = action.payload;
          if (success) {
            state.userdata = updateuser;
          }
          state.updateuserstatus = "fullfilled";
        }
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.updateuserstatus = "rejected";
      });

    //  get All user
    builder
      .addCase(GetAlluser.pending, (state, action) => {
        state.getalluserstatus = "pending";
      })
      .addCase(GetAlluser.fulfilled, (state, action) => {
        state.getalluserstatus = "fullfilled";
        const { success, getAlluser } = action.payload;
        if (success) {
          state.getAlluserdata = getAlluser;
        }
      })
      .addCase(GetAlluser.rejected, (state, action) => {
        state.getalluserstatus = "rejected";
      });

    //  follow user
    builder
      .addCase(FollowUser.pending, (state, action) => {
        state.followuserstatus = "pending";
      })
      .addCase(FollowUser.fulfilled, (state, action) => {
        state.followuserstatus = "fullfilled";
        const {
          success,
          followeruser,
          followingUser,
          postoffollowinguserdata,
        } = action.payload;
        

        if (success) {
          state.userdata = { ...followeruser };
          state.singleuserdata = { ...followingUser };
        }
      })
      .addCase(FollowUser.rejected, (state, action) => {
        state.followuserstatus = "rejected";
      });

    //  unfollow user
    builder
      .addCase(UnFollowUser.pending, (state, action) => {
        state.unfollowuserstatus = "pending";
      })
      .addCase(UnFollowUser.fulfilled, (state, action) => {
        state.unfollowuserstatus = "fullfilled";
        const { success, updateduserdata, unfollowuserdata } = action.payload;

        if (success) {
          state.userdata = { ...updateduserdata };
          state.singleuserdata = { ...unfollowuserdata };
        }
      })
      .addCase(UnFollowUser.rejected, (state, action) => {
        state.unfollowuserstatus = "rejected";
      });

    //  single user data
    builder
      .addCase(Singlewuserdata.pending, (state, action) => {
        state.singleuserstatus = "pending";
      })
      .addCase(Singlewuserdata.fulfilled, (state, action) => {
        state.singleuserstatus = "fullfilled";
        if(action.payload){
          const { success, getuser } = action.payload;
  
          if (success) {
            state.singleuserdata = { ...getuser };
          }

        }
      })
      .addCase(Singlewuserdata.rejected, (state, action) => {
        state.singleuserstatus = "rejected";
      });

    //  logout user
    builder
      .addCase(LogOutuser.pending, (state, action) => {
        state.logoutstatus = "pending";
      })
      .addCase(LogOutuser.fulfilled, (state, action) => {
        state.logoutstatus = "fullfilled";
      })
      .addCase(LogOutuser.rejected, (state, action) => {
        state.logoutstatus = "rejected";
      });
  },
});

export const userreducer = UserSlice.reducer;
export const {
  UpdateUserState,
  UpdateAlluserdata,
  AddunfollowMemberTostate,
  CreatePostNoupdate,
  DeletePostnoupdate,
} = UserSlice.actions;
