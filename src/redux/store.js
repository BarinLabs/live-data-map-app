import { configureStore } from "@reduxjs/toolkit";
import currentDeviceReducer from "./CurrentDevice/currentDeviceSlice";
import definedStandardsSlice from "./DefinedStandards/definedStandardsSlice";
import darkModeSlice from "./DarkMode/darkModeSlice";

const store = configureStore({
  reducer: {
    currentDevice: currentDeviceReducer,
    definedStandards: definedStandardsSlice,
    darkMode: darkModeSlice,
  },
});

export default store;
