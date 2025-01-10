import { createAsyncThunk } from "@reduxjs/toolkit";
import { Apicall } from "../../../constant";



//  login user
export const CreatePost = createAsyncThunk(
  "post/createpost",
  async (postdata) => {
    const res = await Apicall.post("/post/createpost", postdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);

// export const UpdatePost = createAsyncThunk(
//   "post/updatepost",
//   async (postdata) => {
//     const res = await Apicall.post("/post//updatepost/:id", postdata, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return res.data;
//   }
// );


export const Getuserpost = createAsyncThunk("post/userpost", async (id) => {
  const res = await Apicall.get(`/post/userpost/${id}`);


  return res.data;
});

export const DeletePost = createAsyncThunk("post/deletepost", async (id) => {
  const res = await Apicall.delete(`/post/deletepost/${id}`);


  return res.data;
});

export const Getallpostdata = createAsyncThunk("post/getpost/interest", async (pagevalue) => {
  const res = await Apicall.get(`/post/getpost/interest?limit=4&page=${pagevalue}`);


  return res.data;
});

export const LikeAndDisLike = createAsyncThunk("post/lieanddislike", async (id) => {
  const res = await Apicall.post(`/post/likepost/${id}`);


  return res.data;
});


export const ViewPost=createAsyncThunk("/post/viewpost",async(id)=>{
  const res = await Apicall.get(`/post/viewpost/${id}`);
  


  return res.data;
})