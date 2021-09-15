import {icons} from '../../assets/appIcons'
import { useContext } from "react";
import ThemeContext from "../../context/theme-context";

import styles from "./sideMenuContent.module.scss";

const SideMenuContent = ({ item, closeContent }) => {
  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;
  return (
    <div className={isDarkTheme ? styles["container-dark"] : styles.container}>
      <div className={styles.closeBtnContainer}>
        <button onClick={closeContent}>
          {icons.close}
        </button>
      </div>
      {item}
    </div>
  );
};

export default SideMenuContent;
