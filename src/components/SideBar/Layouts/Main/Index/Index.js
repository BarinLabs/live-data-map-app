import styles from "./index.module.scss";

import iconIndexVeryLow from "../Assets/icon-index-very-low.svg";
import iconIndexLow from "../Assets/icon-index-low.svg";
import iconIndexMedium from "../Assets/icon-index-medium.svg";
import iconIndexHigh from "../Assets/icon-index-high.svg";
import iconIndexVeryHigh from "../Assets/icon-index-very-high.svg";

const getIndexDetails = (indexValue) => {
  let indexLevelName = "";
  let indexNameClasses = "index-level-";
  let indexIcon = "";

  if (indexValue <= 25) {
    indexLevelName = "Very low";
    indexNameClasses += "very-low";
    indexIcon = iconIndexVeryLow;
  } else if (indexValue <= 50) {
    indexLevelName = "Low";
    indexNameClasses += "low";
    indexIcon = iconIndexLow;
  } else if (indexValue <= 75) {
    indexLevelName = "Medium";
    indexNameClasses += "medium";
    indexIcon = iconIndexMedium;
  } else if (indexValue <= 100) {
    indexLevelName = "High";
    indexNameClasses += "high";
    indexIcon = iconIndexHigh;
  } else {
    indexLevelName = "Very high";
    indexNameClasses += "very-high";
    indexIcon = iconIndexVeryHigh;
  }

  return {
    indexLevelName,
    indexNameClasses,
    indexIcon,
  };
};

const Index = ({ indexValue }) => {
  const { indexLevelName, indexNameClasses, indexIcon } =
    getIndexDetails(indexValue);

  return (
    <div className={styles["index-container"]}>
      <div className={styles["icon-container"]}>
        <img src={indexIcon} alt="index icon" />
      </div>
      <div className={styles["index-data-container"]}>
        <p className={styles[indexNameClasses]}>{indexLevelName}</p>
        <p>{indexValue}</p>
        <p>Senstate CAQI</p>
      </div>
    </div>
  );
};

export default Index;
