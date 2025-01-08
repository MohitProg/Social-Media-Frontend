import { createAsyncThunk } from "@reduxjs/toolkit";
import { Apicall } from "../../../constant";
import toast from "react-hot-toast";

export const PostComment= createAsyncThunk("/comment/create",async(messagedata)=>{
    console.log(messagedata)
    try {
  
        const res=await Apicall.post(`/post/comment/crtecmt/${messagedata.postId}`, messagedata)
        return res.data;
    } catch (error) {
        const { success, message } = error.response.data;
        success === false && toast.error(message);
    }
 
})

export const GetComment= createAsyncThunk("/comment/get",async(postid)=>{
    try {
        const res=await Apicall.get(`/post/comment/getcmt/${postid}`)
        return res.data
    } catch (error) {
        const { success, message } = error.response.data;
        success === false && toast.error(message);
    }

})

export const DeleteComment= createAsyncThunk("/comment/delete",async(data)=>{
    try {
        
        const res=await Apicall.delete(`/post/comment/delete/${data?._id}`)
        return res.data
    } catch (error) {
        const { success, message } = error.response.data;
        success === false && toast.error(message);
    }
})