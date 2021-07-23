import { configureStore } from "@reduxjs/toolkit";
import currentDeviceReducer from "./CurrentDevice/currentDeviceSlice";

const store = configureStore({
  reducer: {
    currentDevice: currentDeviceReducer,
  },
});

export default store;
