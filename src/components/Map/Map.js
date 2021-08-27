import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";

import styles from "./map.module.scss";
import ThemeContext from "../../context/theme-context";
import Loader from "react-loader-spinner";

const Map = () => {
  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;
  const tileLayerRef = useRef();
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData().catch((e) => console.log("error", e.message));
  }, []);

  const fetchData = async () => {
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
      <div style={{position: "absolute", bottom: 23, right: 10, display: 'flex', alignItems: "center", justifyContent: "center"}}>
        <div style={{backgroundColor: "white", color: "#16123F", paddingLeft: 10, paddingRight: 10, fontWeight: 700}}>Senstate CAQI</div>
        <div style={{backgroundColor: "#79BC6A", width: 90, height: 19}}></div>
        <div style={{backgroundColor: "#BBCF4C", width: 90, height: 19}}></div>
        <div style={{backgroundColor: "#EEC20B", width: 90, height: 19}}></div>
        <div style={{backgroundColor: "#F29305", width: 90, height: 19}}></div>
        <div style={{backgroundColor: "#E8416F", width: 90, height: 19}}></div>
      </div>
    </div>
  );
};

export default Map;
