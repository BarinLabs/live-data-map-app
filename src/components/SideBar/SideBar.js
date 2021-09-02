import { useEffect, useMemo, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDevice,
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";

import ThemeContext from "../../context/theme-context";

import styles from "./sideBar.module.scss";

import HistoricalData from "./HistoricalData/HistoricalData";
import Header from "./Header/Header";
import AQIChart from "./AQIChart/AQIChart";
import Main from "./Main/Main";
import ChannelItemsList from "./Main/ChannelItemsList/ChannelItemsList";
import Loader from "react-loader-spinner";
import { icons } from "../../assets/appIcons";

const updateDeviceDataSeconds = 30;
const updateDeviceIndexMinute = 10;
const updateDeviceIndexSeconds = updateDeviceIndexMinute * 60;

const SideBar = () => {
  const dispatch = useDispatch();

  const { device, error } = useSelector((state) => state.currentDevice);
  const [selectedCategory, setSelectedCategory] = useState("Weather");
  const [selectedChannel, setSelectedChannel] = useState("Temperature");

  const {
    token,
    categories,
    status,
    indexes,
    location,
    deviceURL,
    dataSource,
    channelDataURLTemplate,
  } = device;
  const { online, lastSubmission } = status;

  const fetchDeviceData = async () => {
    const res = await fetch(deviceURL);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const deviceData = await res.json();
    const { data: categories } = deviceData;
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
  }, [token]);

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

  const historicalData = useMemo(
    () => (
      <HistoricalData
        categories={categories}
        category={selectedCategory}
        channel={selectedChannel}
      />
    ),
    [token, selectedCategory, selectedChannel]
  );

  const mainKey = useMemo(() => Math.random().toString(), [token]);
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
          {indexes.length > 0 && (
            <AQIChart
              source={device.dataSource}
              token={token}
              indexes={indexes}
            />
          )}
          <Main
            key={mainKey}
            categories={categories}
            categoryCallback={setSelectedCategory}
            channelCallback={setSelectedChannel}
          />
          {categories.length > 0 && historicalData}
          <div className={styles["channel-items-container"]}>
            <p
              className={
                isDarkTheme
                  ? styles["category-name-dark"]
                  : styles["category-name"]
              }
            >
              {selectedCategory}:
            </p>
            <ChannelItemsList
              category={categories.find((c) => c.name === selectedCategory)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
