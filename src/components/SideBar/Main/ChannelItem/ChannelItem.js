import { useState, useContext } from "react";
import { useStore } from "react-redux";
import styles from "./channelItem.module.scss";
import ThemeContext from "../../../../context/theme-context";
import { icons } from "../Assets/icons";

const getIcon = (channelName) => {
  let icon = "";
  switch (channelName) {
    case "Temperature":
      icon = icons.temperature;
      break;
    case "Pressure":
      icon = icons.pressure;
      break;
    case "Relative Humidity":
      icon = icons.humidity;
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
      break;
    case "SO2":
      icon = icons.so2;
      break;
    case "CO":
      icon = icons.co;
      break;
    case "O3":
      icon = icons.o3;
      break;
    default:
      icon = "";
      break;
  }

  return icon;
};

const ChannelItem = ({ channel }) => {
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
      bgColorClass = "index-bg-no-index-dark"
    }
  }

  const icon = getIcon(name);

  return (
    <div className={`${styles["container"]} ${styles[bgColorClass]}`}>
      <div className={styles["main-container"]}>
        <div className={(isDarkTheme && !standard) ? styles["icon-container-dark"] : styles["icon-container"]}>{icon}</div>
        <p className={(isDarkTheme && !standard) ? styles["channel-name-dark"] : styles["channel-name"]}>{name}</p>
        <p className={(isDarkTheme && !standard) ? styles["p-dark"] : null}>
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
          <p>
            {standardName} ({standard.period}): {standard.limit} {suffix}
          </p>
          <p>{standard.description}</p>
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
