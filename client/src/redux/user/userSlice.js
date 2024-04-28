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
    },
    signSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    signFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
    updateUserStart: (state, action) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.user = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signStart,
  signSuccess,
  signFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
