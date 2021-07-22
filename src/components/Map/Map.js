import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";

import styles from "./map.module.scss";

const Map = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetchData().catch((e) => console.log("error", e.message));
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://open-data.senstate.cloud/devices");

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await response.json();

    const loadedDevices = [];
    for (const key in data) {
      loadedDevices.push(data[key]);
    }

    setDevices(loadedDevices);
  };

  const pins = devices.map((device) => {
    return <Pin key={device.token} device={device} />;
  });

  return (
    <div className={styles.container}>
      <MapContainer
        className={styles.mapContainer}
        center={[42.753, 25.291]}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins}
      </MapContainer>
    </div>
  );
};

export default Map;
