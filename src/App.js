import React, { useEffect } from "react";
import SideMenu from "./components/SideMenu/SideMenu";
import SideBar from "./components/SideBar/SideBar";
import Map from "./components/Map/Map";
import { useDispatch, useSelector, useStore } from "react-redux";
import { fetchDefinedStandards } from "./redux/DefinedStandards/definedStandardsSlice";
import { fetchDefinedIndexes } from "./redux/DefinedIndexes/definedIndexesSlice";
import { ThemeContextProvider } from "./context/theme-context";
import Header from "./components/Header/Header";
import { LangContextProvider } from "./context/lang-context";

function App() {
  const store = useStore();
  const { definedStandards, definedIndexes } = store.getState();
  const isDeviceOpen = useSelector((state) => state.currentDevice.isDeviceOpen);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!definedStandards.length) {
      dispatch(fetchDefinedStandards());
    }

    if (!definedIndexes.length) {
      dispatch(fetchDefinedIndexes());
    }
  }, [definedStandards, definedIndexes, dispatch]);

  return (
    <ThemeContextProvider>
      <LangContextProvider>
        <Header />
        <SideMenu />
        {isDeviceOpen && <SideBar />}
        <Map />
      </LangContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
