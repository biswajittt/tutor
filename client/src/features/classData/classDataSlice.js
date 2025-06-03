import { createSlice } from "@reduxjs/toolkit";
const initialState = { classData: null };
export const classDataSlice = createSlice({
  name: "classData",
  initialState,
  reducers: {
    setClassData: (state, action) => {
      state.classData = action.payload;
    },
    clearClassData: (state) => {
      state.classData = null;
    },
  },
});
export const { setClassData, clearClassData } = classDataSlice.actions;
export default classDataSlice.reducer;
