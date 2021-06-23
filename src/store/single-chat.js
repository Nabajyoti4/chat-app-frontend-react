import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

// auth slice
const initialSingleChatState = {
  friends: [],
  singleChatShow: false,
  currentSelectedFriend: {},
  currentFriendChats: [],
  room: "",
  currentFriendStatus: null,
  currentFriendOnline: null,
  drawer: false,
};

/**
 * thunk function to fetch users friend online status
 */
// export const fetchUserStatus = createAsyncThunk(
//   "userStatus",
//   async (id, thunkAPI) => {
//     const response = await axios.get("/auth/logout", {
//       withCredentials: true,
//       headers: {
//         authorization: sessionStorage.getItem("token"),
//       },
//       params: {
//         id: id,
//       },
//     });
//     return await response.data;
//   }
// );

/**
 * thunk function to fetch users friend online status
 */
export const fetchFriend = createAsyncThunk(
  "friend",
  async ({ id, status }, thunkAPI) => {
    const response = await axios.get("/chat/get-friend", {
      withCredentials: true,
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
      params: {
        id: id,
      },
    });

    return {
      data: response.data,
      status: status,
    };
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
    // setCurrentSelectedFriend(state, action) {
    //   const currentFriend = action.payload;
    //   state.currentSelectedFriend = currentFriend;
    // },
    setRoom(state, action) {
      state.room = action.payload;
    },
    setCurrentFriendChats(state, action) {
      const chats = action.payload;
      state.currentFriendChats = chats;
    },
    setCurrentFriendStatus(state, action) {
      state.currentFriendStatus = action.payload.logined;
      state.currentFriendOnline = action.payload.lastOnline;
    },
    setShowDrawer(state, action) {
      state.drawer = action.payload;
    },
  },
  extraReducers: {
    // // Add reducers for additional action types here, and handle loading state as needed
    // [fetchUserStatus.fulfilled]: (state, action) => {
    //   // Add user to the state array
    //   state.currentFriendOnline = action.payload.lastOnline;
    //   state.currentFriendStatus = false;
    // },
    [fetchFriend.fulfilled]: (state, action) => {
      // Add user to the state array

      if (action.payload.data) {
        const { data, status } = action.payload;

        console.log(data);
        if (status) {
          state.currentFriendStatus = data.logined;
          state.currentFriendOnline = data.lastOnline;
        } else {
          state.currentSelectedFriend = data;
          state.currentFriendStatus = data.logined;
          state.currentFriendOnline = data.lastOnline;
        }
      }
    },
  },
});

export const singleChatActions = singleChatSlice.actions;
export default singleChatSlice;
