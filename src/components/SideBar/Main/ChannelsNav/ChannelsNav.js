import { icons } from "../Assets/icons";
import styles from "./channelsNav.module.scss";

const ChannelsNav = ({
  selectedCategoryName,
  channelsNames,
  selectedChannelName,
  setSelectedChannelName,
}) => {
  const createBtns = () => {
    const btns = [];
    if (selectedCategoryName === "Weather") {
      channelsNames.forEach((name) => {
        const classes =
          selectedChannelName === name ? styles["active-btn"] : null;
        let btnIcon = "";
        let index = "";
        if (name === "Temperature") {
          btnIcon = icons.temperature;
          index = 0;
        } else if (name === "Pressure") {
          btnIcon = icons.pressure;
          index = 1;
        } else {
          btnIcon = icons.humidity;
          index = 2;

          btns[index] = (
            <button
              key={index}
              className={classes}
              onClick={() => setSelectedChannelName(name)}
            >
              {btnIcon} Humidity
            </button>
          );

          return;
        }

        btns[index] = (
          <button
            key={index}
            className={classes}
            onClick={() => setSelectedChannelName(name)}
          >
            {btnIcon} {name}
          </button>
        );
      });
    } else if (selectedCategoryName === "Particulates") {
      channelsNames.forEach((name) => {
        const classes =
          selectedChannelName === name ? styles["active-btn"] : null;
        let btnIcon = "";
        let index = "";
        if (name === "PM1.0") {
          btnIcon = icons.pm1;
          index = 0;
        } else if (name === "PM2.5") {
          btnIcon = icons.pm2;
          index = 1;
        } else if (name === "PM4.0") {
          btnIcon = icons.pm4;
          index = 2;
        } else if (name === "PM10") {
          btnIcon = icons.pm10;
          index = 3;
        }

        btns[index] = (
          <button
            key={index}
            className={classes}
            onClick={() => setSelectedChannelName(name)}
          >
            {btnIcon} {name}
          </button>
        );
      });
    } else if (selectedCategoryName === "Gases") {
      channelsNames.forEach((name) => {
        const classes =
          selectedChannelName === name ? styles["active-btn"] : null;
        let btnIcon = "";
        let index = "";
        if (name === "NO2") {
          btnIcon = icons.pm1;
          index = 0;
        } else if (name === "CO") {
          btnIcon = icons.pm2;
          index = 1;
        } else if (name === "O3") {
          btnIcon = icons.pm4;
          index = 2;
        } else if (name === "SO2") {
          btnIcon = icons.pm10;
          index = 3;
        }

        btns[index] = (
          <button
            key={index}
            className={classes}
            onClick={() => setSelectedChannelName(name)}
          >
            {btnIcon} {name}
          </button>
        );
      });
    }

    return btns;
  };

  const buttons = createBtns();

  return (
    <div className={styles["container"]}>
      <div className={styles["btns-container"]}>
        {buttons}
        {/* <button className={styles["active-btn"]}>{icons.pm1}PM 1.0</button>
        <button>{icons.pm2}PM 2.5</button>
        <button>{icons.pm4}PM 4.0</button>
        <button>{icons.pm10}PM 10.0</button> */}
      </div>
    </div>
  );
};

export default ChannelsNav;
