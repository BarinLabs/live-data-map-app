import React, { useState } from "react";
import Map from "./components/Map/Map";

function App() {
  const [devices, setDevices] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://open-data.senstate.cloud/devices");
    const data = await response.json();

    const loadedDevices = [];
    for (const key in data) {
      loadedDevices.push(data[key]);
    }

    setDevices(loadedDevices);
  };

  return (
    <>
      <div>
        <button onClick={fetchData}>FetchData</button>
      </div>
      <div>
        <Map devices={devices} />
      </div>
    </>
  );
}

export default App;
