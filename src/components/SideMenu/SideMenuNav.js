import { useContext, useState } from "react";

import styles from "./sideMenuNav.module.scss";

import ThemeContext from "../../context/theme-context";
import { sideMenuIcons } from "./Assets/icons";

const SideMenuNav = ({ selectItem, isItemSelected }) => {
  const themeCtx = useContext(ThemeContext);
  const { isDarkTheme, toggleDarkTheme } = themeCtx;

  const themeIcon = isDarkTheme ? sideMenuIcons.light : sideMenuIcons.dark;
  const themeBtnText = isDarkTheme ? "Light mode" : "Night mode";

  let containerClasses = [styles["container"]];
  if (isDarkTheme) {
    containerClasses.push(styles["dark-theme"]);
  }

  return (
    <section className={containerClasses.join(" ")}>
      <div className={styles["theme-btn-container"]}>
        <button onClick={toggleDarkTheme}>{themeIcon}</button>
        {!isItemSelected && (
          <span className={styles["tooltiptext"]}>{themeBtnText}</span>
        )}
      </div>
      <div className={styles["about-btn-container"]}>
        <button onClick={() => selectItem("About")}>
          {sideMenuIcons.about}
        </button>
        {!isItemSelected && (
          <span className={styles["tooltiptext"]}>About</span>
        )}
      </div>
      <div className={styles["faq-btn-container"]}>
        <button onClick={() => selectItem("Faq")}>{sideMenuIcons.faq}</button>
        {!isItemSelected && <span className={styles["tooltiptext"]}>FAQ</span>}
      </div>
    </section>
  );
};

export default SideMenuNav;
