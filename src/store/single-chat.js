import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

// auth slice
const initialSingleChatState = {
  friends: [],
  singleChatShow: false,
  currentSelectedFriend: {},
  currentFriendChats: [],
  currentFriendStatus: null,
  currentFriendOnline: null,
};

export const fetchUserStatus = createAsyncThunk(
  "userStatus",
  async (id, thunkAPI) => {
    const response = await axios.get("/auth/logout", {
      withCredentials: true,
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
      params: {
        id: id,
      },
    });
    return await response.data;
  }
);

const singleChatSlice = createSlice({
  name: "singleChat",
  initialState: initialSingleChatState,
  reducers: {
    setFriends(state, action) {
      const friends = action.payload;
      state.friends = friends;
    },

    setSingleChat(state, action) {
      state.singleChatShow = action.payload;
    },
    setCurrentSelectedFriend(state, action) {
      const currentFriend = action.payload;
      state.currentSelectedFriend = currentFriend;
    },
    setCurrentFriendChats(state, action) {
      const chats = action.payload;
      state.currentFriendChats = chats;
    },
    setCurrentFriendStatus(state, action) {
      state.currentFriendStatus = action.payload.logined;
      state.currentFriendOnline = action.payload.lastOnline;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUserStatus.fulfilled]: (state, action) => {
      // Add user to the state array
      state.currentFriendOnline = action.payload.lastOnline;
      state.currentFriendStatus = false;
    },
  },
});

export const singleChatActions = singleChatSlice.actions;
export default singleChatSlice;
