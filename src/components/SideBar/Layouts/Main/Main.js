import { useMemo } from "react";
import styles from "./main.module.scss";

import Index from "./Index/Index";

import bgImageNoIndex from "./Assets/bg-image-no-index.svg";
import bgImageIndexVeryLow from "./Assets/bg-image-index-very-low.svg";
import bgImageIndexLow from "./Assets/bg-image-index-low.svg";
import bgImageIndexMedium from "./Assets/bg-image-index-medium.svg";
import bgImageIndexHigh from "./Assets/bg-image-index-high.svg";
import bgImageIndexVeryHigh from "./Assets/bg-image-index-very-high.svg";

import iconClock from "./Assets/icon-clock.svg";
import iconFacebook from "./Assets/icon-facebook.svg";
import iconTwitter from "./Assets/icon-twitter.svg";

const getBgDetails = (indexValue) => {
  let bgImage = "";
  let bgColorClass = "index-bg-";
  let indexTextBgColorClass = "index-color-";
  let indexDescText = "";

  if (!indexValue && indexValue !== 0) {
    bgImage = bgImageNoIndex;
    bgColorClass += "no-index";
  } else if (indexValue <= 25) {
    bgImage = bgImageIndexVeryLow;
    bgColorClass += "very-low";
    indexTextBgColorClass += "very-low";
    indexDescText = "Enjoy all outdoor activities";
  } else if (indexValue <= 50) {
    bgImage = bgImageIndexLow;
    bgColorClass += "low";
    indexTextBgColorClass += "low";
    indexDescText = "Enjoy your usual outdoor activities";
  } else if (indexValue <= 75) {
    bgImage = bgImageIndexMedium;
    bgColorClass += "medium";
    indexTextBgColorClass += "medium";
    indexDescText = "Avoid strenuous outdoor activities";
  } else if (indexValue <= 100) {
    bgImage = bgImageIndexHigh;
    bgColorClass += "high";
    indexTextBgColorClass += "high";
    indexDescText = "Avoid all outdoor physical activities";
  } else {
    bgImage = bgImageIndexVeryHigh;
    bgColorClass += "very-high";
    indexTextBgColorClass += "very-high";
    indexDescText = "Stay indoor and avoid physical exertion";
  }

  return {
    bgImage,
    bgColorClass,
    indexTextBgColorClass,
    indexDescText,
  };
};

const getTime = (lastSubmission) => {
  const date = new Date(lastSubmission);
  const hours = date.getUTCHours() - Math.floor(date.getTimezoneOffset() / 60);
  const minutes = date.getUTCMinutes();
  return `${hours}:${minutes}`;
};

const Main = ({ indexes, location, lastSubmission }) => {
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

  const time = getTime(lastSubmission);

  const { bgImage, bgColorClass, indexTextBgColorClass, indexDescText } =
    getBgDetails(indexValue);

  return (
    <>
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
      {indexValue && (
        <div
          className={`${styles["index-description-container"]} ${styles[indexTextBgColorClass]}`}
        >
          <span>{indexDescText}</span>
        </div>
      )}
      <div className={styles["last-submission-container"]}>
        <img src={iconClock} alt="clock icon" />
        <span>{`Last updated at ${time}`}</span>
      </div>
    </>
  );
};

export default Main;
