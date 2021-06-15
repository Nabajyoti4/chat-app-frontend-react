import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import groupSlice from "./group";
import notificationSlice from "./notification";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;
