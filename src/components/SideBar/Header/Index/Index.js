import styles from "./index.module.scss";

import { icons } from "../Assets/icons";

const getIndexDetails = (indexValue) => {
  let indexLevelName = "";
  let indexNameClasses = "index-level-";
  let indexIcon = "";

  if (indexValue <= 25) {
    indexLevelName = "Very low";
    indexNameClasses += "very-low";
    indexIcon = icons.indexVeryLow;
  } else if (indexValue <= 50) {
    indexLevelName = "Low";
    indexNameClasses += "low";
    indexIcon = icons.indexLow;
  } else if (indexValue <= 75) {
    indexLevelName = "Medium";
    indexNameClasses += "medium";
    indexIcon = icons.indexMedium;
  } else if (indexValue <= 100) {
    indexLevelName = "High";
    indexNameClasses += "high";
    indexIcon = icons.indexHigh;
  } else {
    indexLevelName = "Very high";
    indexNameClasses += "very-high";
    indexIcon = icons.indexVeryHigh;
  }

  return {
    indexLevelName,
    indexNameClasses,
    indexIcon,
  };
};

const Index = ({ index }) => {
  console.log(index);
  const { value, slug } = index;
  const { indexLevelName, indexNameClasses, indexIcon } =
    getIndexDetails(value);

  return (
    <div className={styles["index-container"]}>
      <div className={styles["icon-container"]}>{indexIcon}</div>
      <div className={styles["index-data-container"]}>
        <p className={styles[indexNameClasses]}>{indexLevelName}</p>
        <p>{value}</p>
        <p>Senstate {slug.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default Index;
