import { useEffect, useMemo, useState, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDevice,
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";

import ThemeContext from "../../context/theme-context";

import styles from "./sideBar.module.scss";

import Header from "./Header/Header";
import AQIChart from "./AQIChart/AQIChart";
import Main from "./Main/Main";
import Loader from "react-loader-spinner";
import { icons } from "../../assets/appIcons";
import LangContext from "../../context/lang-context";

const updateDeviceDataSeconds = 30;

const SideBar = () => {
  const dispatch = useDispatch();

  const langCtx = useContext(LangContext);
  const { lang } = langCtx;

  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState({ online: true });
  const [error, setError] = useState(false);

  const { online, lastSubmission } = status;

  const { device } = useSelector((state) => state.currentDevice);
  const { token, indexes, location } = device;

  //NOT Updating channels!!!!

  const fetchDeviceData = useCallback(async () => {
    let { deviceURL } = device;
    const res = await fetch(deviceURL);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const deviceData = await res.json();
    const { data, status } = deviceData;
    setCategories(data);
    setStatus(status);
    setError(false);
  }, [lang, device]);

  useEffect(() => {
    fetchDeviceData().catch((e) => setError(true));

    const updateDeviceDataIntervalID = setInterval(() => {
      fetchDeviceData().catch((e) => setError(true));
    }, 1000 * updateDeviceDataSeconds);
    return () => {
      clearInterval(updateDeviceDataIntervalID);
    };
  }, [fetchDeviceData]);

  const [headerKey, setHeaderKey] = useState(Math.random().toString());
  const updateHeaderKey = () => {
    setHeaderKey(Math.random().toString());
  };

  const header = useMemo(() => {
    return (
      <Header
        key={headerKey}
        updateHeader={updateHeaderKey}
        indexes={indexes}
        location={location}
      />
    );
  }, [token, headerKey]);

  const airQualityIndexChart = useMemo(() => {
    return (
      <AQIChart source={device.dataSource} token={token} indexes={indexes} />
    );
  }, [token]);

  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;

  return (
    <div className={isDarkTheme ? styles.container_dark : styles.container}>
      <div
        className={`${styles.closeBtnContainer} ${
          isDarkTheme && !online && styles.closeBtnContainerDarkTheme
        }`}
      >
        <button onClick={() => dispatch(closeDevice())}>{icons.close}</button>
      </div>

      {(error || !online) && (
        <div className={styles.errorContainer}>
          <Loader
            type="Rings"
            color={isDarkTheme ? "white" : "#16123f"}
            height={100}
            width={100}
          />
          <p>The device is offline. Please try again in few minutes.</p>
        </div>
      )}

      {!error && online && (
        <div>
          {header}
          {indexes.length > 0 && airQualityIndexChart}
          {categories.length > 0 && (
            <Main token={token} categories={categories} />
          )}
        </div>
      )}
    </div>
  );
};

export default SideBar;
