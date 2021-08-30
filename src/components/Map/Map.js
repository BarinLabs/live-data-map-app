import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";

import styles from "./map.module.scss";
import ThemeContext from "../../context/theme-context";
import Loader from "react-loader-spinner";
import ErrorModal from "../ErrorModal/ErrorModal";

const updateMapFrequencySeconds = 60;

const Map = () => {
  const themeCtx = useContext(ThemeContext);
  const { isDarkTheme } = themeCtx;
  const tileLayerRef = useRef();
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchDevices().catch((e) => setError(true));

    // setInterval(() => {
    //   fetchDevices().catch((e) => setError(true));
    // }, 1000 * updateMapFrequencySeconds);
  }, []);

  const fetchDevices = async () => {
    setIsLoading(true);
    const response = await fetch("https://open-data.senstate.cloud/devices");

    if (!response.ok) {
      setIsLoading(false);
      throw new Error("Something went wrong.");
    }
    error && setError(false);

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
    <>
      {error && <ErrorModal />}
      <div className={styles.container}>
        <MapContainer
          className={styles.mapContainer}
          center={[42.753, 25.291]}
          zoom={8}
          scrollWheelZoom={true}
          zoomControl={false}
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
        <div className={styles["index-colors-container"]}>
          <div className={styles["index-name-container"]}>Senstate CAQI</div>
          <div style={{ backgroundColor: "#79BC6A" }}></div>
          <div style={{ backgroundColor: "#BBCF4C" }}></div>
          <div style={{ backgroundColor: "#EEC20B" }}></div>
          <div style={{ backgroundColor: "#F29305" }}></div>
          <div style={{ backgroundColor: "#E8416F" }}></div>
        </div>
      </div>
    </>
  );
};

export default Map;
