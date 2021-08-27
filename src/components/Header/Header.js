import { icons } from "../../assets/appIcons";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles["container"]}>
      <button>{icons.close}</button>
      <div className={styles["senstate-logo-container"]}>
        {icons.senstateLogo}
      </div>
    </div>
  );
};

export default Header;
