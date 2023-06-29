import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  article: [],
};


export const PostReducer = createSlice({
  name: "PostReducer",
  initialState,
  reducers: {
    getPost: (state, action) => {
      state.article = [...state.article, ...action.payload];
    },
  },
});

export const newPost = (data, file) => {

  return async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    console.log(data);
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);

    try {
      const res = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Your Beauty Journey Posted!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
        document.location.href = "/";
    } catch (error) {
      console.log(error.response);
      toast.error(`Can't Create Post`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    }
  };
};


export const likePost = (postId) => {
  return async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog/like`,
        {
          BlogId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("You liked the post");
    } catch (error) {
      alert(error.response.data.err);
      
    }
  };
};

export const { getPost } = PostReducer.actions;

export default PostReducer.reducer;