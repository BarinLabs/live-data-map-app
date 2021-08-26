import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";

import styles from "./map.module.scss";
import ThemeContext from "../../context/theme-context";
import Loader from "react-loader-spinner";

const updateMapFrequencySeconds = 60;

const Map = () => {
  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;
  const tileLayerRef = useRef();
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDevices().catch((e) => console.log("error", e.message));

    setInterval(() => {
      fetchDevices().catch((e) => console.log("error", e.message));
    }, 1000 * updateMapFrequencySeconds);
  }, []);

  const fetchDevices = async () => {
    setIsLoading(true);
    const response = await fetch("https://open-data.senstate.cloud/devices");

    if (!response.ok) {
      setIsLoading(false);
      throw new Error("Something went wrong.");
    }

    const data = await response.json();

    const loadedDevices = [];
    for (const key in data) {
      loadedDevices.push(data[key]);
    }

    setDevices(loadedDevices);
    setIsLoading(false);
  };

  const pins = devices.map((device) => {
    return <Pin key={device.token} device={device} />;
  });

  let tileLayerClasses =
    tileLayerRef.current && (isDarkTheme ? styles.darkMode : styles.lightMode);

  const tileLayerKey = useMemo(() => {
    return Math.random().toString();
  }, [isDarkTheme]);

  return (
    <div className={styles.container}>
      <MapContainer
        className={styles.mapContainer}
        center={[42.753, 25.291]}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          ref={tileLayerRef}
          key={tileLayerKey}
          className={tileLayerClasses}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isLoading ? (
          <Loader
            className={styles.loader}
            type="Oval"
            color="rgb(0 120 255)"
            height={30}
            width={30}
          />
        ) : (
          pins
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
