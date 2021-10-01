import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  isDeviceOpen: false,
  device: {
    token: "",
    deviceURL: "",
    channelDataURLTemplate: "",
    location: {},
    dataSource: {},
  },
};

export const currentDeviceSlice = createSlice({
  name: "currentDevice",
  initialState,
  reducers: {
    openDevice: (state, action) => {
      state.isDeviceOpen = true;
      const currDevice = action.payload.device;

      const { token, dataEndpoint } = currDevice;

      let { deviceURL, channelDataURL } = dataEndpoint;

      deviceURL = deviceURL.replace("{Token}", token);
      const channelDataURLTemplate = channelDataURL.replace("{Token}", token);

      state.device = { ...currDevice, deviceURL, channelDataURLTemplate };

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
