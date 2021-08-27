import { useMemo } from "react";
import styles from "./header.module.scss";

import Index from "./Index/Index";

import { icons } from "./Assets/icons";

import bgImageNoIndex from "./Assets/bg-image-no-index.svg";
import bgImageIndexVeryLow from "./Assets/bg-image-index-very-low.svg";
import bgImageIndexLow from "./Assets/bg-image-index-low.svg";
import bgImageIndexMedium from "./Assets/bg-image-index-medium.svg";
import bgImageIndexHigh from "./Assets/bg-image-index-high.svg";
import bgImageIndexVeryHigh from "./Assets/bg-image-index-very-high.svg";
import UpdateTimer from "./UpdateTimer/UpdateTimer";

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

const Header = ({ indexes, location, updateHeader }) => {
  const { address, city, country } = location;
  const locationDetails = `${address}, ${city}, ${country}`;

  const index = useMemo(() => {
    if (indexes.length > 0) {
      let index = indexes.find((index) => index.slug === "sbaqi");
      if (!index) {
        index = indexes[0];
      }

      const { value, slug } = index;
      return { value, slug };
    }
    return null;
  }, [indexes]);

  const { bgImage, bgColorClass, indexTextBgColorClass, indexDescText } =
    getBgDetails(index?.value);

  const bgImageKey = useMemo(() => Math.random().toString(), [bgImage]);

  return (
    <>
      <div className={`${styles["container"]} ${styles[bgColorClass]}`}>
        <div key={bgImageKey} className={styles["bg-image-container"]}>
          <img src={bgImage} alt="index background" />
        </div>
        <div className={styles["index-and-address-container"]}>
          {index && <Index index={index} />}
          <div className={styles["address-and-social-icons-container"]}>
            {address && (
              <span className={styles["address-container"]}>
                {locationDetails}
              </span>
            )}
            <div className={styles["social-icons-container"]}>
              {icons.facebook}
              {icons.twitter}
            </div>
          </div>
        </div>
      </div>
      {index && (
        <div
          className={`${styles["index-description-container"]} ${styles[indexTextBgColorClass]}`}
        >
          <span>{indexDescText}</span>
        </div>
      )}
      <UpdateTimer updateHeader={updateHeader} />
    </>
  );
};

export default Header;
