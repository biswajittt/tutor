import { configureStore } from "@reduxjs/toolkit";
import joinModalReducer from "../features/joinModal/joinModalSlice.js";

export const store = configureStore({
  //registered reducers
  reducer: joinModalReducer,
});
