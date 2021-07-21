import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./sideMenuItem.module.scss";

const SideMenuItem = ({ title, icon, isMenuOpen }) => {
  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <button>
          <FontAwesomeIcon icon={icon} size="lg" />
        </button>
      </div>
      {isMenuOpen && (
        <div className={styles.titleContainer}>
          <p>{title}</p>
        </div>
      )}
    </div>
  );
};

export default SideMenuItem;
