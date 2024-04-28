import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signStart: (state, action) => {
      state.loading = true;
      state.error = false;
      state.user = null;
    },
    signSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    signFailure: (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
  },
});

export const { signStart, signSuccess, signFailure } = userSlice.actions;

export default userSlice.reducer;
