import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCog,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./sideMenu.module.scss";
import { useState } from "react";
import SideMenuItem from "./SideMenuItem";

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

  const menuStyles = `${styles.container} ${
    isMenuOpen ? styles.activeMenu : ""
  }`;
  return (
    <section className={menuStyles}>
      <div className={styles.toggleMenu}>
        <button onClick={toggleOpenMenuBtn}>{openMenuBtnIcon}</button>
      </div>
      <SideMenuItem
        title={"Preferences"}
        icon={faCog}
        isMenuOpen={isMenuOpen}
      />
      <SideMenuItem title={"Share"} icon={faShareAlt} isMenuOpen={isMenuOpen} />
    </section>
  );
};

export default SideMenu;
