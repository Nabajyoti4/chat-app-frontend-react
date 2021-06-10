import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import groupSlice from "./group";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    group: groupSlice.reducer,
  },
});

export default store;
