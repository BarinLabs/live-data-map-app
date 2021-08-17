import { configureStore } from "@reduxjs/toolkit";
import currentDeviceReducer from "./CurrentDevice/currentDeviceSlice";
import definedStandardsReducer from "./DefinedStandards/definedStandardsSlice";
import definedIndexesReducer from "./DefinedIndexes/definedIndexesSlice";

const store = configureStore({
  reducer: {
    currentDevice: currentDeviceReducer,
    definedStandards: definedStandardsReducer,
    definedIndexes: definedIndexesReducer,
  },
});

export default store;
