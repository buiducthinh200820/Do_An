import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    allTagData: [],
  },
  reducers: {
    setTagData(state, action) {
      state.allTagData = action.payload;
    },
  },
});

export const { setTagData } = tagSlice.actions;

export default tagSlice.reducer;
