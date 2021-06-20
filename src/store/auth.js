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
  },
});

export const authActions = authSlice.actions;
export default authSlice;
