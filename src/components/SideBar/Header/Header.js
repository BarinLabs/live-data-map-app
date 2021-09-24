import { useContext, useMemo } from "react";
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
import { isDataRecent } from "../../../utils/utils";

import LangContext from "../../../context/lang-context";
import { translator } from "../../../utils/translator";

const updateDeviceIndexMinutes = 10;
const updateDeviceIndexLimitInMinutes = updateDeviceIndexMinutes * 3;

const getBgDetails = (indexValue) => {
  let bgImage = "";
  let bgColorClass = "index-bg-";
  let indexTextBgColorClass = "index-color-";
  let indexDescTextNumber = null;

  if (!indexValue && indexValue !== 0) {
    bgImage = bgImageNoIndex;
    bgColorClass += "no-index";
  } else if (indexValue <= 25) {
    bgImage = bgImageIndexVeryLow;
    bgColorClass += "very-low";
    indexTextBgColorClass += "very-low";
    indexDescTextNumber = 1;
  } else if (indexValue <= 50) {
    bgImage = bgImageIndexLow;
    bgColorClass += "low";
    indexTextBgColorClass += "low";
    indexDescTextNumber = 2;
  } else if (indexValue <= 75) {
    bgImage = bgImageIndexMedium;
    bgColorClass += "medium";
    indexTextBgColorClass += "medium";
    indexDescTextNumber = 3;
  } else if (indexValue <= 100) {
    bgImage = bgImageIndexHigh;
    bgColorClass += "high";
    indexTextBgColorClass += "high";
    indexDescTextNumber = 4;
  } else {
    bgImage = bgImageIndexVeryHigh;
    bgColorClass += "very-high";
    indexTextBgColorClass += "very-high";
    indexDescTextNumber = 5;
  }

  return {
    bgImage,
    bgColorClass,
    indexTextBgColorClass,
    indexDescTextNumber,
  };
};

const Header = ({ indexes, location, updateHeader }) => {
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;

  const { address, city, country } = location;
  const locationDetails = `${address}, ${city}, ${country}`;

  const index = useMemo(() => {
    if (indexes.length > 0) {
      let index = indexes.find((index) => index.slug === "sbaqi");
      if (!index) {
        index = indexes[0];
      }

      const { value, slug, timeStamp } = index;
      return { value, slug, timeStamp };
    }
    return null;
  }, [indexes]);

  let error = false;
  if (index) {
    error = !isDataRecent(index.timeStamp, updateDeviceIndexLimitInMinutes);
  }

  const { bgImage, bgColorClass, indexTextBgColorClass, indexDescTextNumber } =
    getBgDetails(!error ? index?.value : null);

  const bgImageKey = useMemo(() => Math.random().toString(), [bgImage]);

  return (
    <>
      <div className={`${styles["container"]} ${styles[bgColorClass]}`}>
        <div key={bgImageKey} className={styles["bg-image-container"]}>
          <img src={bgImage} alt="index background" />
        </div>
        <div className={styles["index-and-address-container"]}>
          {error && (
            <div className={styles["error-container"]}>
              <p>No recent index data</p>
            </div>
          )}
          {!error && index && <Index index={index} lang={lang} />}
          <div className={styles["address-and-social-icons-container"]}>
            {address && (
              <span className={styles["address-container"]}>
                {locationDetails}
              </span>
            )}
            <div className={styles["social-icons-container"]}>
              <a href={"https://www.facebook.com/SenstateTech"} target="_blank">
                {icons.facebook}
              </a>
              <a
                href={"https://www.linkedin.com/company/senstate-technologies"}
                target="_blank"
              >
                {icons.linkedin}
              </a>
            </div>
          </div>
        </div>
      </div>
      {!error && index && (
        <div
          className={`${styles["index-description-container"]} ${styles[indexTextBgColorClass]}`}
        >
          <span>{translator.CAQMDescriptions[lang][indexDescTextNumber]}</span>
        </div>
      )}
      <UpdateTimer lang={lang} updateHeader={updateHeader} />
    </>
  );
};

export default Header;
