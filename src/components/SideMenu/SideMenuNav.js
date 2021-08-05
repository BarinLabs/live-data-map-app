import DarkModeToggle from "react-dark-mode-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import SideMenuItem from "./SideMenuItem";

import styles from "./sideMenuNav.module.scss";

import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCog,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

const SideMenuNav = ({ selectItem, closeContent }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleOpenMenuBtn = () => {
    if (isMenuOpen) {
      closeContent();
    }
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
        selectItem={selectItem}
        title={"About"}
        icon={faCog}
        isMenuOpen={isMenuOpen}
      />
      <SideMenuItem
        selectItem={selectItem}
        title={"Faq"}
        icon={faShareAlt}
        isMenuOpen={isMenuOpen}
      />
      <div className={styles.darkModeToggleContainer}>
        <DarkModeToggle
          onChange={handleDarkModeToggle}
          checked={isDarkMode}
          size={50}
        />
      </div>
    </section>
  );
};

export default SideMenuNav;
