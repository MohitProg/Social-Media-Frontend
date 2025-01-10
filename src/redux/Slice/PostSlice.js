import { createSlice } from "@reduxjs/toolkit";
import {
  CreatePost,
  DeletePost,
  Getallpostdata,
  Getuserpost,
  LikeAndDisLike,
  ViewPost,
} from "./PostApiSlice";

const initialState = {
  Allpostdatatoviewuser: [],
  userPostdata: [],
  singlepostdata:"",
  allpoststatus: "idle",
  userpostdatastatus: "idle",
  createpoststatus: "idle",
  deletepoststatus: "idle",
  likeanddislikestatus: "idle",
  viewpoststatus:"idle"
};
const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    DeletePostdatafromstate: (state, action) => {
      const postdata = state.userPostdata.filter(
        (value) => value?._id !== action.payload?._id
      );
      state.userPostdata = [...postdata];
    },

   
    
    //  updating a;; post data if we are following some one
    UpdateAllpostdata: (state, action) => {
      console.log(action.payload);
      state.Allpostdatatoviewuser = [
        ...action.payload,
        ...state.Allpostdatatoviewuser,
      ];
    },
    //  updating all post data if we are unfollow any user
    UpdateAllpostonunfollow: (state, action) => {


      const posidarray = [];
      action.payload.forEach((value) => {
        posidarray.push(value._id);
      });

      let postdata = state.Allpostdatatoviewuser.filter((value) => {
        return !posidarray.some((id) => value._id === id);
      });
      postdata = JSON.parse(JSON.stringify(postdata));

      state.Allpostdatatoviewuser = [...postdata];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreatePost.pending, (state, action) => {
        state.createpoststatus = "pending";
      })
      .addCase(CreatePost.fulfilled, (state, action) => {
        state.createpoststatus = "fulfilled";
        const { CreatePost, success } = action.payload;
        if (success) {
          state.userPostdata = [CreatePost, ...state.userPostdata];
        }
      })
      .addCase(CreatePost.rejected, (state, action) => {
        state.createpoststatus = "rejected";
      });

    //  get user post
    builder
      .addCase(Getuserpost.pending, (state, action) => {
        state.userpostdatastatus = "pending";
      })
      .addCase(Getuserpost.fulfilled, (state, action) => {
        state.userpostdatastatus = "fulfilled";

        const { userpost, success } = action.payload;
        if (success) {
          state.userPostdata = userpost;
        }
      })
      .addCase(Getuserpost.rejected, (state, action) => {
        state.userpostdatastatus = "rejected";
      });
    // get post according to user
    builder
      .addCase(Getallpostdata.pending, (state, action) => {
        state.allpoststatus = "pending";
      })
      .addCase(Getallpostdata.fulfilled, (state, action) => {
        state.allpoststatus = "fulfilled";

        const { success, getpostaccordingtouser } = action.payload;
        if (success) {
          state.Allpostdatatoviewuser = [
            ...state.Allpostdatatoviewuser,
            ...getpostaccordingtouser,
          ];
        }
      })
      .addCase(Getallpostdata.rejected, (state, action) => {
        state.allpoststatus = "rejected";
      });

    builder
      .addCase(DeletePost.pending, (state, action) => {
        state.deletepoststatus = "pending";
      })
      .addCase(DeletePost.fulfilled, (state, action) => {
        state.deletepoststatus = "fulfilled";
      })
      .addCase(DeletePost.rejected, (state, action) => {
        state.deletepoststatus = "rejected";
      });

    builder
      .addCase(LikeAndDisLike.pending, (state, action) => {
        state.likeanddislikestatus = "pending";
      })
      .addCase(LikeAndDisLike.fulfilled, (state, action) => {
        state.likeanddislikestatus = "fulfilled";
        const { success, postdata } = action.payload;

        if (success) {
          let data = JSON.parse(JSON.stringify(state.Allpostdatatoviewuser));
          const userpostdata = JSON.parse(JSON.stringify(state.userPostdata));
          const findexistvalueforuserpostdata = userpostdata.filter(
            (value) => value?._id === postdata._id
          );

          console.log(findexistvalueforuserpostdata);
          const findexistvalueforallpostdata = data.filter(
            (value) => value?._id === postdata._id
          );
          if (
            findexistvalueforallpostdata !== null &&
            findexistvalueforallpostdata?.length > 0
          ) {
            const index = data.indexOf(findexistvalueforallpostdata[0]);
            // console.log(index,data,findexistvalue,postdata)
            data.splice(index, 1, postdata);
            // console.log(data)
            state.Allpostdatatoviewuser = data;
          }

          if (
            findexistvalueforuserpostdata !== null &&
            findexistvalueforuserpostdata?.length > 0
          ) {
            const index = userpostdata.indexOf(
              findexistvalueforuserpostdata[0]
            );

            userpostdata.splice(index, 1, postdata);

            state.userPostdata = userpostdata;
          }
        }
      })
      .addCase(LikeAndDisLike.rejected, (state, action) => {
        state.likeanddislikestatus = "rejected";
      });



     // viewpost single post  
      builder
      .addCase(ViewPost.pending, (state, action) => {
        state.viewpoststatus = "pending";
      })
      .addCase(ViewPost.fulfilled, (state, action) => {
        state.viewpoststatus = "fulfilled";

        const { postdata, success } = action.payload;
        if (success) {
          state.singlepostdata = postdata;
        }
      })
      .addCase(ViewPost.rejected, (state, action) => {
        state.viewpoststatus = "rejected";
      });
  },
});
export const postReducer = PostSlice.reducer;
export const {
  DeletePostdatafromstate,
  UpdateAllpostdata,
  UpdateAllpostonunfollow,
} = PostSlice.actions;
