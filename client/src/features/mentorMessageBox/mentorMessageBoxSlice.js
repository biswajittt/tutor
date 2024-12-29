import { createSlice } from "@reduxjs/toolkit";
const initialState = { showMentorMessageBox: false };

export const mentorMessageBoxSlice = createSlice({
  name: "showMentorMessageBox",
  initialState,
  reducers: {
    clickedOnMentorMessageButton: (state, action) => {
      state.showMentorMessageBox = action.payload;
    },
  },
});

export const { clickedOnMentorMessageButton } = mentorMessageBoxSlice.actions;
export default mentorMessageBoxSlice.reducer;
