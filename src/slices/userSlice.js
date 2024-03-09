import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFullName(state, action) {
      state.fullName = action.payload;
    },

    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },

    resetUserState() {
      return initialState
    },
  },
});

export const { setFullName, setPhoneNumber, resetUserState } = userSlice.actions;

export default userSlice.reducer;

export const getUserState = (state) => state.user;
export const getUserFullName = (state) => state.user.fullName;
export const getUserPhoneNumber = (state) => state.user.phoneNumber;
