import { configureStore } from "@reduxjs/toolkit";
import joinModalReducer from "../features/joinModal/joinModalSlice.js";
import mentorMessageBoxReducer from "../features/mentorMessageBox/mentorMessageBoxSlice.js";
export const store = configureStore({
  //registered reducers
  reducer: {
    joinModal: joinModalReducer,
    mentorMessageBox: mentorMessageBoxReducer,
  },
});
