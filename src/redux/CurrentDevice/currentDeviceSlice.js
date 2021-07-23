import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  isDeviceOpen: false,
  device: { data: {}, status: { online: false, lastSubmissionShort: "" } },
};

export const currentDeviceSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    openDevice: (state, action) => {
      state.isDeviceOpen = true;
      state.device = action.payload.device;
      state.error = false;
    },
    closeDevice: (state) => {
      state.isDeviceOpen = false;
      state.device = { ...initialState };
      state.error = false;
    },
    setError: (state) => {
      state.isDeviceOpen = true;
      state.device = { ...initialState.device };
      state.error = true;
    },
  },
});

export const { openDevice, closeDevice, setError } = currentDeviceSlice.actions;

export default currentDeviceSlice.reducer;
