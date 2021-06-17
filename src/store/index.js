import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import groupSlice from "./group";
import notificationSlice from "./notification";
import singleChatSlice from "./single-chat";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
    notification: notificationSlice.reducer,
    singleChat: singleChatSlice.reducer,
  },
});

export default store;
