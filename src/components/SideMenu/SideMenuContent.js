import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>
      {item}
    </div>
  );
};

export default SideMenuContent;
