import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

// auth slice
const initialAuthState = {
  user: {},
  isAuth: false,
};

/**
 * User name update
 */
/**
 * thunk function to fetch users friend online status
 */
export const updateName = createAsyncThunk(
  "updateName",
  async (data, thunkAPI) => {
    const response = await axios.put("/user/update-name", data, {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    });
    console.log("edit user api thunk");
    return response.data;
  }
);

/**
 * thunk to upload image
 */
export const updateAvatar = createAsyncThunk(
  "updateAvatar",
  async (data, thunkAPI) => {
    console.log(data.files[0]);
    var bodyFormData = new FormData();
    bodyFormData.append("id", data.id);
    bodyFormData.append("avatar", data.files[0]);

    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}user/upload-avatar/`,
      headers: {
        "content-type": "multipart/form-data",
        authorization: sessionStorage.getItem("token"),
      },
      data: bodyFormData,
    });

    // const response = await axios.post("/user/upload-avatar/", bodyFormData, {
    //   headers: {
    //     authorization: sessionStorage.getItem("token"),
    //     "content-type": "multipart/form-data",
    //   },
    // });
    console.log("edit user avatar api thunk");
    return response.data;
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.user = user;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
  extraReducers: {
    [updateName.fulfilled]: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    },
    [updateAvatar.fulfilled]: (state, action) => {
      if (action.payload) {
        state.user.avatar = action.payload.path;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
