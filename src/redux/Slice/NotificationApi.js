import { createAsyncThunk } from "@reduxjs/toolkit";
import { Apicall, Base_Url } from "../../../constant";


export const GetNotification=createAsyncThunk("/getnot",async(id)=>{
    try {
        const res= await Apicall.get(`${Base_Url}/api/v1/notification/getallnotification/${id}`)
        // console.log(res.data);
        return res.data
        
    } catch (error) {
        console.log(error)
        
    }

})

export const CreateNotification=createAsyncThunk("/createnot",async({name,type,postid,comment,reciverid})=>{
    
    try {
        const res=await Apicall.post(`${Base_Url}/api/v1/notification/createnotification/`,{name,type,postid,comment,reciverid})
        console.log(res.data);
        
    } catch (error) {
        console.log(error);

    }

})

export const ReadNotification=createAsyncThunk("/readNot",async(id)=>{
    try {
        const res=await Apicall.put(`${Base_Url}/api/v1/notification/readnotification/${id}`)
        console.log(res.data);
        return res?.data;
        
    } catch (error) {
        console.log(error);

    }

})