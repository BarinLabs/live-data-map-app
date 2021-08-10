import React, { useEffect } from "react";
import SideMenu from "./components/SideMenu/SideMenu";
import SideBar from "./components/SideBar/SideBar";
import Map from "./components/Map/Map";
import { useDispatch, useSelector, useStore } from "react-redux";
import { fetchDefinedStandards } from "./redux/DefinedStandards/definedStandardsSlice";
import { ThemeContextProvider } from "./context/theme-context";

function App() {
  const store = useStore();
  const { standardsArr } = store.getState().definedStandards;
  const isDeviceOpen = useSelector((state) => state.currentDevice.isDeviceOpen);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!standardsArr.length) {
      dispatch(fetchDefinedStandards());
    }
  }, [standardsArr, dispatch]);

  return (
    <ThemeContextProvider>
      <SideMenu />
      {isDeviceOpen && <SideBar />}
      <Map />
    </ThemeContextProvider>
  );
}

export default App;
