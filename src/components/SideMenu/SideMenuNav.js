import DarkModeToggle from "react-dark-mode-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

import SideMenuItem from "./SideMenuItem";

import styles from "./sideMenuNav.module.scss";

import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCog,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import ThemeContext from "../../context/theme-context";

const SideMenuNav = ({ selectItem, closeContent }) => {
  const ctx = useContext(ThemeContext);
  const { isDarkTheme, toggleDarkTheme } = ctx;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleOpenMenuBtn = () => {
    if (isMenuOpen) {
      closeContent();
    }
    setIsMenuOpen((prevState) => !prevState);
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
          onChange={toggleDarkTheme}
          checked={isDarkTheme}
          size={50}
        />
      </div>
    </section>
  );
};

export default SideMenuNav;
