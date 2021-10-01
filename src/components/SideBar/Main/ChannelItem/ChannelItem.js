import { useState, useContext } from "react";
import { useStore } from "react-redux";
import styles from "./channelItem.module.scss";
import ThemeContext from "../../../../context/theme-context";
import LangContext from "../../../../context/lang-context";
import { icons } from "../Assets/icons";
import { translator } from "../../../../utils/translator";

const getIconAndDescKey = (channelName) => {
  let icon = "";
  let descriptionKey = "";
  switch (channelName) {
    case "Temperature":
    case "Температура":
      icon = icons.temperature;
      descriptionKey = "temperatureDescription";
      break;
    case "Pressure":
    case "Налягане":
      icon = icons.pressure;
      descriptionKey = "pressureDescription";
      break;
    case "Relative Humidity":
    case "Относителна влажност":
      icon = icons.humidity;
      descriptionKey = "humidityDescription";
      break;
    case "PM1.0":
      icon = icons.pm1;
      break;
    case "PM2.5":
      icon = icons.pm2;
      break;
    case "PM4.0":
      icon = icons.pm4;
      break;
    case "PM10":
      icon = icons.pm10;
      break;
    case "NO2":
      icon = icons.no2;
      descriptionKey = "no2Description";
      break;
    case "SO2":
      icon = icons.so2;
      descriptionKey = "so2Description";
      break;
    case "CO":
      icon = icons.co;
      descriptionKey = "coDescription";
      break;
    case "O3":
      icon = icons.o3;
      descriptionKey = "о3Description";
      break;
    default:
      icon = "";
      break;
  }

  return { icon, descriptionKey };
};

const ChannelItem = ({ channel }) => {
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;
  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;
  const store = useStore();
  const { definedStandards } = store.getState();
  const { name, value, suffix, standards } = channel;
  const standard = standards[0];
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapseOpen((prevState) => !prevState);
  };

  let percentage = "";
  let standardName = "";
  let bgColorClass = "index-bg-";
  let percentageBarClass = "index-color-";
  if (standard) {
    const currPercentage = standard.percentage * 100;

    if (currPercentage <= 25) {
      bgColorClass += "very-low";
      percentageBarClass += "very-low";
    } else if (currPercentage <= 50) {
      bgColorClass += "low";
      percentageBarClass += "low";
    } else if (currPercentage <= 75) {
      bgColorClass += "medium";
      percentageBarClass += "medium";
    } else if (currPercentage <= 100) {
      bgColorClass += "high";
      percentageBarClass += "high";
    } else {
      bgColorClass += "very-high";
      percentageBarClass += "very-high";
    }

    percentage = Math.round(currPercentage) + "%";

    const standardSlug = standard.standard;
    const backupStandardName = standardSlug + " regulations";
    const matchingStandard = definedStandards.find(
      (currStand) => currStand.slug === standardSlug
    );

    standardName = matchingStandard
      ? matchingStandard.name
      : backupStandardName;
  } else {
    if (isDarkTheme) {
      bgColorClass = "index-bg-no-index-dark";
    }
  }

  const { icon, descriptionKey } = getIconAndDescKey(name);
  const description = translator.textWidgets[lang][descriptionKey];

  return (
    <div className={`${styles["container"]} ${styles[bgColorClass]}`}>
      <div className={styles["main-container"]}>
        <div
          className={
            isDarkTheme && !standard
              ? styles["icon-container-dark"]
              : styles["icon-container"]
          }
        >
          {icon}
        </div>
        <p
          className={
            isDarkTheme && !standard
              ? styles["channel-name-dark"]
              : styles["channel-name"]
          }
        >
          {description ? description : name}
        </p>
        <p className={isDarkTheme && !standard ? styles["p-dark"] : null}>
          {value.toFixed(0)} {suffix}
        </p>
        {standard && (
          <button onClick={toggleCollapse}>
            {isCollapseOpen ? icons.upArrow : icons.downArrow}
          </button>
        )}
      </div>
      {standard && isCollapseOpen && (
        <div className={styles.descriptionContainer}>
          <p>{standardName}</p>
          <p>
            {standard.period === "One hour" &&
              translator.textWidgets[lang].limitHText}
            : {standard.limit} {suffix}{" "}
          </p>
          {/* <p>{standard.description}</p> */}
        </div>
      )}
      <div className={styles["fill-percentage"]}>
        <span
          className={styles[percentageBarClass]}
          style={{ width: `${percentage}` }}
        ></span>
      </div>
    </div>
  );
};

export default ChannelItem;
