import React, { useEffect } from "react";
import SideMenu from "./components/SideMenu/SideMenu";
import SideBar from "./components/SideBar/SideBar";
import Map from "./components/Map/Map";
import { useDispatch, useSelector, useStore } from "react-redux";
import { fetchDefinedStandards } from "./redux/DefinedStandards/definedStandardsSlice";

function App() {
  const isDeviceOpen = useSelector((state) => state.currentDevice.isDeviceOpen);
  const store = useStore();
  const { standardsArr } = store.getState().definedStandards;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!standardsArr.length) {
      dispatch(fetchDefinedStandards());
    }
  }, [standardsArr, dispatch]);

  return (
    <>
      <SideMenu />
      {isDeviceOpen && <SideBar />}
      <Map />
    </>
  );
}

export default App;
