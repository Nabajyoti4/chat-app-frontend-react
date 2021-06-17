import { createSlice } from "@reduxjs/toolkit";
// auth slice
const initialSingleChatState = {
  friends: [],
  singleChatShow: false,
  currentSelectedFriend: {},
  currentFriendChats: [],
};

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
  },
});

export const singleChatActions = singleChatSlice.actions;
export default singleChatSlice;
