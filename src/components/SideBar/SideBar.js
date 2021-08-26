import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDevice,
  openDevice,
  setError,
} from "../../redux/CurrentDevice/currentDeviceSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./sideBar.module.scss";

import Slugs from "./Main/Slugs/Slugs";
import HistoricalData from "./HistoricalData/HistoricalData";
import Header from "./Header/Header";
import AQIChart from "./AQIChart/AQIChart";
import Main from "./Main/Main";
import ChannelItem from "./Main/ChannelItem/ChannelItem";

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
    [token]
  );

  const mainKey = useMemo(() => Math.random().toString(), [token]);
  return (
    <div className={styles.container}>
      {error && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}

      {!error && (
        <div>
          <div className={styles.closeBtnAndStatusContainer}>
            <button onClick={() => dispatch(closeDevice())}>
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>
          {header}
          {indexes.length > 0 && <AQIChart token={token} indexes={indexes} />}
          <Main
            key={mainKey}
            categories={categories}
            categoryCallback={setSelectedCategory}
            channelCallback={setSelectedChannel}
          />
          {categories.length > 0 && historicalData}
          <div className={styles["channel-items-container"]}>
            <p className={styles["category-name"]}>{selectedCategory}:</p>
            {categories
              .find((c) => c.name === selectedCategory)
              .channels.map((channel) => (
                <ChannelItem key={channel.token} channel={channel} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
