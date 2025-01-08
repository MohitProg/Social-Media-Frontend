import { configureStore } from "@reduxjs/toolkit"
import { userreducer } from "./Slice/UserSlice"
import { postReducer } from "./Slice/PostSlice"
import { commentreducer } from "./Slice/CommentSlice"

export const store = configureStore({
    reducer: {
        user: userreducer,
        post:postReducer,
        comment:commentreducer
    }
})