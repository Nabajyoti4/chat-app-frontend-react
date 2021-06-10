import { createSlice } from "@reduxjs/toolkit";
// auth slice
const initialAuthState = {
  user: {},
  friends: [],
  groups: [],
  singleChat: false,
  currentSelectedFriend: {},
  currentFriendChats: [],
  isAuth: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const user = action.payload;
      state.user = user;
      state.isAuth = true;
    },
    setFriends(state, action) {
      const friends = action.payload;
      state.friends = friends;
    },
    setGroups(state, action) {
      const groups = action.payload;
      state.groups = groups;
    },
    setSingleChat(state, action) {
      state.singleChat = action.payload;
    },
    setCurrentSelectedFriend(state, action) {
      const currentFriend = action.payload;
      state.currentSelectedFriend = currentFriend;
    },
    setCurrentFriendChats(state, action) {
      const chats = action.payload;
      state.currentFriendChats = chats;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
