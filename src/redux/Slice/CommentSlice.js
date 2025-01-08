import { createSlice } from "@reduxjs/toolkit";
import { DeleteComment, GetComment, PostComment } from "./CommentApislice";

const initialState = {
  postcommentdata: [],
  getcommentstatus: "idle",
  postcommentstatus: "idle",
  deletecommentstatus: "idle",
};

const CommentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {

    //  get omments 
    builder
    .addCase(GetComment.pending, (state, action) => {
      state.getcommentstatus = "pending";
    })
    .addCase(GetComment.fulfilled, (state, action) => {
      if(action.payload!==undefined){
        const {success,commentdata}=action.payload;
        // console.log(action.payload);
        if(success){
          state.postcommentdata=commentdata
        }

      }
      state.getcommentstatus = "fulfilled";
    })
    .addCase(GetComment.rejected, (state, action) => {
      state.getcommentstatus = "rejected";
    });
    
    // create comment
    builder
      .addCase(PostComment.pending, (state, action) => {
        state.postcommentstatus = "pending";
      })
      .addCase(PostComment.fulfilled, (state, action) => {
        if(action.payload!==undefined){
          const {success,comment}=action.payload;
          // console.log(action.payload);
          if(success){
            state.postcommentdata=[comment,...state.postcommentdata]
          }
  
        }
        state.postcommentstatus = "fulfilled";
      })
      .addCase(PostComment.rejected, (state, action) => {
        state.postcommentstatus = "rejected";
      });


    //    delete comment 
    builder
    .addCase(DeleteComment.pending, (state, action) => {
      state.deletecommentstatus = "pending";
    })
    .addCase(DeleteComment.fulfilled, (state, action) => {
      if(action.payload!==undefined){
        const {deletecomment,success}=action.payload;

        if(success){
          const data=state.postcommentdata.filter((value)=>value?._id !==deletecomment?._id);
          state.postcommentdata=[...data]
        }
      }
      state.deletecommentstatus = "fulfilled";
    })
    .addCase(DeleteComment.rejected, (state, action) => {
      state.deletecommentstatus = "rejected";
    });
  },
});


export const  commentreducer=CommentSlice.reducer;