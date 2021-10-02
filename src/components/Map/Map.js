import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Pin from "./Pin";

import styles from "./map.module.scss";
import ThemeContext from "../../context/theme-context";
import Loader from "react-loader-spinner";
import ErrorModal from "../ErrorModal/ErrorModal";
import LangContext from "../../context/lang-context";
import { translator } from "../../utils/translator";

const updateMapFrequencySeconds = 60;

const Map = () => {
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;
  const themeCtx = useContext(ThemeContext);
  const { isDarkTheme } = themeCtx;
  const tileLayerRef = useRef();
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
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

      if (error) {
        setError(false);
      }

      setDevices(loadedDevices);
      setIsLoading(false);
    };

    fetchDevices().catch((e) => setError(true));

    const intervalId = setInterval(() => {
      fetchDevices().catch((e) => setError(true));
    }, 1000 * updateMapFrequencySeconds);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
          maxZoom={17}
          minZoom={3}
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
        <div
          className={`${styles["index-colors-container"]} ${
            isDarkTheme && styles["i-c-c-dark-theme"]
          }`}
        >
          <div className={styles["index-name-container"]}>Senstate CAQI</div>
          <div
            className={styles["index-very-low-container"]}
            style={{ backgroundColor: "#79BC6A" }}
          >
            <span className={styles["tooltiptext"]}>
              {translator.statesText[lang].veryLow}
            </span>
          </div>
          <div
            className={styles["index-low-container"]}
            style={{ backgroundColor: "#BBCF4C" }}
          >
            <span className={styles["tooltiptext"]}>
              {translator.statesText[lang].low}
            </span>
          </div>
          <div
            className={styles["index-medium-container"]}
            style={{ backgroundColor: "#EEC20B" }}
          >
            <span className={styles["tooltiptext"]}>
              {translator.statesText[lang].medium}
            </span>
          </div>
          <div
            className={styles["index-high-container"]}
            style={{ backgroundColor: "#F29305" }}
          >
            <span className={styles["tooltiptext"]}>
              {translator.statesText[lang].high}
            </span>
          </div>
          <div
            className={styles["index-very-high-container"]}
            style={{ backgroundColor: "#E8416F" }}
          >
            <span className={styles["tooltiptext"]}>
              {translator.statesText[lang].veryHigh}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
