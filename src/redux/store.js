import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducer/UserReducer"
import PostReducer from "./reducer/PostReducer";
export const store = configureStore({
    reducer: {
        UserReducer: UserReducer,
        PostReducer: PostReducer
    },
});