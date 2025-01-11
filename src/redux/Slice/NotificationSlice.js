import { createSlice } from "@reduxjs/toolkit";
import { CreateNotification, GetNotification, ReadNotification } from "./NotificationApi";

const initialState = {
  notificationdata: [],
  getnotstatus: "idle",
  readnotstatus: "idle",
  createnotstatus: "idle",
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    UpdateNotification:(state,action)=>{
      state.notificationdata=[action.payload,...state.notificationdata]

    }
  },
  extraReducers: (builder) => {
    // methods for get notification
    builder
      .addCase(GetNotification.pending, (state, action) => {
        state.getnotstatus = "pending";
      })
      .addCase(GetNotification.fulfilled, (state, action) => {
        console.log(action.payload)
        if(action?.payload !==undefined){
          console.log(action.payload,"not")

          state.notificationdata=action?.payload?.notification
        }
        state.getnotstatus = "fullfilled";
      })
      .addCase(GetNotification.rejected, (state, action) => {
        state.getnotstatus = "rejected";
      });

    //  method for create notifictaion
    builder
      .addCase(CreateNotification.pending, (state, action) => {
        state.createnotstatus = "pending";
      })
      .addCase(CreateNotification.fulfilled, (state, action) => {
        state.createnotstatus = "fullfilled";
      })
      .addCase(CreateNotification.rejected, (state, action) => {
        state.createnotstatus = "rejected";
      });

      // read notifation 
      builder
      .addCase(ReadNotification.pending, (state, action) => {
        state.readnotstatus = "pending";
      })
      .addCase(ReadNotification.fulfilled, (state, action) => {
        state.readnotstatus = "fullfilled";
      })
      .addCase(ReadNotification.rejected, (state, action) => {
        state.readnotstatus = "rejected";
      });
  },
});



// export {} = NotificationSlice.actions;
export const notficationReducer= NotificationSlice.reducer
export const  {UpdateNotification}=NotificationSlice.actions;