import { useEffect, useMemo, useState, useContext } from "react";
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
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;
  const dispatch = useDispatch();

  const { device, error } = useSelector((state) => state.currentDevice);

  let {
    token,
    categories: initialCategories,
    status,
    indexes,
    location,
    deviceURL,
    dataSource,
    channelDataURLTemplate,
  } = device;

  const [categories, setCategories] = useState(initialCategories);

  console.log(device);

  const { online, lastSubmission } = status;

  //NOT Updating channels!!!!

  const fetchDeviceData = async () => {
    const res = await fetch(deviceURL);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const deviceData = await res.json();
    const { data: categories } = deviceData;
    setCategories(categories);
    delete deviceData.data;

    dispatch(
      openDevice({
        device: {
          token,
          deviceURL,
          channelDataURLTemplate,
          location: { ...location },
          categories,
          dataSource,
          ...deviceData,
        },
      })
    );
  };

  useEffect(() => {
    const updateDeviceDataIntervalID = setInterval(() => {
      fetchDeviceData().catch((e) => dispatch(setError()));
    }, 1000 * updateDeviceDataSeconds);
    return () => {
      clearInterval(updateDeviceDataIntervalID);
    };
  }, [token, lang]);

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
          <Main token={token} categories={categories} />
        </div>
      )}
    </div>
  );
};

export default SideBar;
