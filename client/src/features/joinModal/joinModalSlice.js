import { createSlice } from "@reduxjs/toolkit";

const initialState = { showJoinModal: false };

export const joinModalSlice = createSlice({
  name: "showJoinModal",
  initialState,
  reducers: {
    clickedOnJoinButton: (state, action) => {
      state.showJoinModal = action.payload;
    },
  },
});

export const { clickedOnJoinButton } = joinModalSlice.actions;
export default joinModalSlice.reducer;
