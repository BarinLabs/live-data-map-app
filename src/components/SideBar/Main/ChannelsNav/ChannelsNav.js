import { icons } from "../Assets/icons";
import styles from "./channelsNav.module.scss";
import { useContext } from "react";
import ThemeContext from "../../../../context/theme-context";
import LangContext from "../../../../context/lang-context";
import { translator } from "../../../../utils/translator";

const ChannelsNav = ({
  channelsNames,
  selectedChannelName,
  setSelectedChannelName,
}) => {
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;
  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;
  const createBtns = () => {
    const btns = [];

    channelsNames.forEach((name) => {
      const classes =
        selectedChannelName === name
          ? styles["active-btn"]
          : isDarkTheme
          ? styles["button_dark"]
          : null;

      let btnIcon = "";
      let index = "";
      let btnTitle = name;

      switch (name) {
        case "Temperature":
          btnTitle = translator.textWidgets[lang].temperatureTitle;
          btnIcon = icons.temperature;
          index = 0;
          break;
        case "Pressure":
          btnTitle = translator.textWidgets[lang].pressureTitle;
          btnIcon = icons.pressure;
          index = 1;
          break;
        case "Relative Humidity":
          btnTitle = translator.textWidgets[lang].humidityTitle;
          btnIcon = icons.humidity;
          index = 2;
          break;
        case "PM1.0":
          btnIcon = icons.pm1;
          index = 0;
          break;
        case "PM2.5":
          btnIcon = icons.pm2;
          index = 1;
          break;
        case "PM4.0":
          btnIcon = icons.pm4;
          index = 2;
          break;
        case "PM10":
          btnIcon = icons.pm10;
          index = 3;
          break;
        case "NO2":
          btnIcon = icons.no2;
          index = 0;
          break;

        case "CO":
          btnIcon = icons.co;
          index = 1;
          break;
        case "O3":
          btnIcon = icons.o3;
          index = 2;
          break;
        case "SO2":
          btnIcon = icons.so2;
          index = 3;
          break;
        default:
          break;
      }

      btns[index] = (
        <button
          key={index}
          className={classes}
          onClick={() => setSelectedChannelName(name)}
        >
          {btnIcon} {btnTitle}
        </button>
      );
    });

    return btns;
  };

  const buttons = createBtns();

  return (
    <div className={styles["container"]}>
      <div
        className={
          isDarkTheme ? styles["btns-container-dark"] : styles["btns-container"]
        }
      >
        {buttons}
      </div>
    </div>
  );
};

export default ChannelsNav;
