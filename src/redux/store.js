import { configureStore } from "@reduxjs/toolkit";
import currentDeviceReducer from "./CurrentDevice/currentDeviceSlice";
import definedStandardsSlice from "./DefinedStandards/definedStandardsSlice";

const store = configureStore({
  reducer: {
    currentDevice: currentDeviceReducer,
    definedStandards: definedStandardsSlice,
  },
});

export default store;
