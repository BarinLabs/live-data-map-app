import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCog,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./sideMenu.module.scss";
import { useState } from "react";

const SideMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleOpenMenuBtn = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openMenuBtnIcon = isMenuOpen ? (
    <FontAwesomeIcon
      icon={faChevronCircleLeft}
      size="lg"
      style={{ color: "#0078ff" }}
    />
  ) : (
    <FontAwesomeIcon
      icon={faChevronCircleRight}
      size="lg"
      style={{ color: "#0078ff" }}
    />
  );
  return (
    <section className={styles.container}>
      <div className={styles.toggleMenu}>
        <button onClick={toggleOpenMenuBtn}>{openMenuBtnIcon}</button>
      </div>
      <div className={styles.sideMenuItem}>
        <div className={styles.sideMenuItemBtnContainer}>
          <button>
            <FontAwesomeIcon icon={faCog} size="lg" />
          </button>
        </div>
        {isMenuOpen && (
          <div className={styles.sideMenuItemTitleContainer}>
            <p>Preferences</p>
          </div>
        )}
      </div>
      <div className={styles.sideMenuItem}>
        <div className={styles.sideMenuItemBtnContainer}>
          <button>
            <FontAwesomeIcon icon={faShareAlt} size="lg" />
          </button>
        </div>
        {isMenuOpen && (
          <div className={styles.sideMenuItemTitleContainer}>
            <p>Share</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SideMenu;
