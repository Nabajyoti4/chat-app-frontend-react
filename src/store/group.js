import { createSlice } from "@reduxjs/toolkit";
// auth slice
const initialGroupState = {
  groups: [],
  currentSelectedGroup: {},
  currentGroupChats: [],
  groupChat: false,
};

const groupSlice = createSlice({
  name: "group",
  initialState: initialGroupState,
  reducers: {
    setGroups(state, action) {
      const groups = action.payload;
      state.groups = groups;
    },
    setGroupChat(state, action) {
      state.groupChat = action.payload;
    },
    setCurrentSelectedGroup(state, action) {
      const currentGroup = action.payload;
      state.currentSelectedGroup = currentGroup;
    },
    setCurrentGroupChats(state, action) {
      const chats = action.payload;
      state.currentGroupChats = chats;
    },
  },
});

export const groupActions = groupSlice.actions;
export default groupSlice;
