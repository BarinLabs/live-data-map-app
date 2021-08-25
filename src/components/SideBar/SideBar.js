import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDevice } from "../../redux/CurrentDevice/currentDeviceSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./sideBar.module.scss";

import Slugs from "./Main/Slugs/Slugs";
import HistoricalData from "./HistoricalData/HistoricalData";
import Header from "./Header/Header";
import AQIChart from "./AQIChart/AQIChart";
import Main from "./Main/Main";
import ChannelItem from "./Main/ChannelItem/ChannelItem";

const SideBar = () => {
  const dispatch = useDispatch();

  const { device, error } = useSelector((state) => state.currentDevice);
  const [selectedCategory, setSelectedCategory] = useState("Weather");
  const [selectedChannel, setSelectedChannel] = useState("Temperature");

  const { token, categories, status, indexes, location } = device;
  const { online, lastSubmission } = status;

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
          <Header
            indexes={indexes}
            location={location}
            lastSubmission={lastSubmission}
          />
          {indexes.length > 0 && <AQIChart token={token} indexes={indexes} />}
          <Main key={mainKey} 
          categories={categories} 
          categoryCallback={setSelectedCategory}
          channelCallback={setSelectedChannel}
          />
          {/* <div>*/}
            {categories.length > 0 && (
              <HistoricalData 
              categories={categories} 
              category={selectedCategory}
              channel={selectedChannel}
              />
             
            )} 
             <div className={styles["channel-items-container"]}>
              <p className={styles["category-name"]}>{selectedCategory}:</p>
              {categories.find(c => c.name === selectedCategory).channels.map((channel) => (
                <ChannelItem key={channel.token} channel={channel} />
              ))}
            </div>
          {/* {weatherChannels.length > 0 && <Weather channels={categories} />} */}
          {/* {indexes.length > 0 && <Slugs slugs={indexes} />}
            {gasesChannels.length > 0 && <Gases channels={gasesChannels} />}
            {particulatesChannels.length > 0 && (
              <Particulates channels={particulatesChannels} />
            )}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default SideBar;
