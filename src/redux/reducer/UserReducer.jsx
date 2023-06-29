import { useToast } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";
import toast from "react-toastify"

const initialState = {
  user: {
    id: null,
    username: "",
    email: "",
    phone: "",
    imgProfile: "",
    isVerified: false,
    role: false,
  },
  login: false,
  loginError: null,
  token: ""
};

export const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, phone, imgProfile, isVerified, role } =
        action.payload;
      state.user = {
        id,
        username,
        email,
        phone,
        imgProfile,
        isVerified,
        role,
      };
    },
    setToken: (state, action) => {
      state.token.push(action.payload)
    },

    userLogin: (state, action) => {
      state.login = true;
      state.loginError = null;
    },

    userLogout: (state, action) => {
      state.login = false;
    },
    keepLoginSuccess: (state) => {
      state.login = true;
    },
    handleProfile: (state, action) => {
      state.imgProfile.push(action.payload);
    },

  },
});

// export const signIn = (values) => {

//   return async (dispatch) => {
//     try {
//       // const { name, email, password, phone } = values;
//       console.log(values);
//       const login = await axios.post(
//         `https://minpro-blog.purwadhikabootcamp.com/api/auth/login`,
//         {
//           username: values.theinput,
//           email: values.theinput,
//           phone: values.theinput,
//           password: values.password,
//         }
//       );
//       console.log("ini respon", login);
      
//       const token = login.data.token;
//       dispatch(userLogin()); 
//       dispatch(setUser(login.data.isAccountExist));
//       // document.location.href = "/";
//     } catch (error) {
//       console.log("ini error", error);
//       console.log(values.password)
//     }
//   };
// };

export const keepLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const respon = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setUser(respon.data));
        dispatch(keepLoginSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const {
  userLogin,
  userLoginFailed,
  userLogout,
  setUser,
  userName,
  userEmail,
  userPhone,
  keepLoginSuccess,
  changeUsername,
  setToken
} = UserReducer.actions;
export default UserReducer.reducer;