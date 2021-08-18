import { useMemo } from "react";
import styles from "./main.module.scss";

import Index from "./Index/Index";

import bgImageNoIndex from "./Assets/bg-image-no-index.svg";
import bgImageIndexVeryLow from "./Assets/bg-image-index-very-low.svg";
import bgImageIndexLow from "./Assets/bg-image-index-low.svg";
import bgImageIndexMedium from "./Assets/bg-image-index-medium.svg";
import bgImageIndexHigh from "./Assets/bg-image-index-high.svg";
import bgImageIndexVeryHigh from "./Assets/bg-image-index-very-high.svg";

import iconFacebook from "./Assets/icon-facebook.svg";
import iconTwitter from "./Assets/icon-twitter.svg";

const getBgDetails = (indexValue) => {
  let bgImage = "";
  let bgColorClass = "index-level-";

  if (!indexValue && indexValue !== 0) {
    bgImage = bgImageNoIndex;
    bgColorClass += "no-index";
  } else if (indexValue <= 25) {
    bgImage = bgImageIndexVeryLow;
    bgColorClass += "very-low";
  } else if (indexValue <= 50) {
    bgImage = bgImageIndexLow;
    bgColorClass += "low";
  } else if (indexValue <= 75) {
    bgImage = bgImageIndexMedium;
    bgColorClass += "medium";
  } else if (indexValue <= 100) {
    bgImage = bgImageIndexHigh;
    bgColorClass += "high";
  } else {
    bgImage = bgImageIndexVeryHigh;
    bgColorClass += "very-high";
  }

  return {
    bgImage,
    bgColorClass,
  };
};

const Main = ({ indexes, location }) => {
  const { address, city, country } = location;
  const locationDetails = `${address}, ${city}, ${country}`;

  const indexValue = useMemo(() => {
    if (indexes.length > 0) {
      let index = indexes.find((index) => index.slug === "sbaqi");
      if (!index) {
        index = indexes[0];
      }

      const { value } = index;
      return value;
    }
    return null;
  }, [indexes]);

  const { bgImage, bgColorClass } = getBgDetails(indexValue);

  return (
    <div className={`${styles["container"]} ${styles[bgColorClass]}`}>
      <div className={styles["bg-image-container"]}>
        <img src={bgImage} alt="index level background" />
      </div>
      <div className={styles["index-and-address-container"]}>
        {indexValue && <Index indexValue={indexValue} />}
        <div className={styles["address-and-social-icons-container"]}>
          {address && (
            <span className={styles["address-container"]}>
              {locationDetails}
            </span>
          )}
          <div className={styles["social-icons-container"]}>
            <img src={iconFacebook} alt="social media icon" />
            <img src={iconTwitter} alt="social media icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
