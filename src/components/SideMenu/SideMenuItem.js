import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./sideMenuItem.module.scss";


const SideMenuItem = ({ title, icon, isMenuOpen, selectItem }) => {
  const containerStyles = `${styles.container} ${
    isMenuOpen ? styles.activeMenu : ""
  }`;

  return (
    <div onClick={() => selectItem(title)} className={containerStyles}>
      <div className={styles.btnContainer}>
        <button>
          <FontAwesomeIcon icon={icon} size="lg" />
        </button>
      </div>
      {isMenuOpen && (
        <div
        
        className={styles.titleContainer}>
          {title}
        </div>
      )}
    </div>
  );
};

export default SideMenuItem;