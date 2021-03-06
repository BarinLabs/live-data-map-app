import React, { useContext } from "react";
import LangContext from "../../../../context/lang-context";
import { translator } from "../../../../utils/translator";

import styles from "./index.module.scss";

import { icons } from "../Assets/icons";

const getIndexDetails = (indexValue) => {
  let indexLevelName = "";
  let indexNameClasses = "index-level-";
  let indexIcon = "";

  if (indexValue <= 25) {
    indexLevelName = "veryLow";
    indexNameClasses += "very-low";
    indexIcon = icons.indexVeryLow;
  } else if (indexValue <= 50) {
    indexLevelName = "low";
    indexNameClasses += "low";
    indexIcon = icons.indexLow;
  } else if (indexValue <= 75) {
    indexLevelName = "medium";
    indexNameClasses += "medium";
    indexIcon = icons.indexMedium;
  } else if (indexValue <= 100) {
    indexLevelName = "high";
    indexNameClasses += "high";
    indexIcon = icons.indexHigh;
  } else {
    indexLevelName = "veryHigh";
    indexNameClasses += "very-high";
    indexIcon = icons.indexVeryHigh;
  }

  return {
    indexLevelName,
    indexNameClasses,
    indexIcon,
  };
};

const Index = ({ index, lang }) => {
  const { value, slug } = index;
  const { indexLevelName, indexNameClasses, indexIcon } =
    getIndexDetails(value);

  return (
    <div className={styles["index-container"]}>
      <div className={styles["icon-container"]}>{indexIcon}</div>
      <div className={styles["index-data-container"]}>
        <p className={styles[indexNameClasses]}>
          {translator.statesText[lang][indexLevelName]}
        </p>

        <p>
          {value}
          <label> / 100</label>
        </p>

        <p>Senstate {slug.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default Index;
