import React from "react";
import SideMenu from "./components/SideMenu/SideMenu";
import SideBar from "./components/SideBar/SideBar";
import Map from "./components/Map/Map";
import { useSelector } from "react-redux";

function App() {
  const isDeviceOpen = useSelector((state) => state.currentDevice.isDeviceOpen);
  return (
    <>
      <SideMenu />
      {isDeviceOpen && <SideBar />}
      <Map />
    </>
  );
}

export default App;
