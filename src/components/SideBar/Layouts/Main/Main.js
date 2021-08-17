import styles from "./main.module.scss";

import bgImageIndexVeryLow from "../../../../assets/icons/bg-image-index-very-low.svg";
import iconIndexVeryLow from "../../../../assets/icons/icon-index-very-low.svg";
import iconFacebook from "../../../../assets/icons/icon-facebook.svg";
import iconTwitter from "../../../../assets/icons/icon-twitter.svg";

const Main = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["bg-image-container"]}>
        <img src={bgImageIndexVeryLow} alt="index icon" />
      </div>
      <div className={styles["index-and-address-container"]}>
        <div className={styles["index-container"]}>
          <div className={styles["icon-container"]}>
            <img src={iconIndexVeryLow} alt="index icon" />
          </div>
          <div className={styles["index-data-container"]}>
            <p>Very low</p>
            <p>7.5</p>
            <p>Senstate CAQI</p>
          </div>
        </div>
        <div className={styles["address-and-social-icons-container"]}>
          <span className={styles["address-container"]}>
            1 Transportna St, 5300 Gabrovo, Bulgaria
          </span>
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
