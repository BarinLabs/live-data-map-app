import { useContext, useState } from "react";

import styles from "./sideMenuNav.module.scss";

import ThemeContext from "../../context/theme-context";
import { sideMenuIcons } from "./Assets/icons";

const SideMenuNav = ({ selectItem }) => {
  const ctx = useContext(ThemeContext);
  const { isDarkTheme, toggleDarkTheme } = ctx;

  return (
    <section className={styles["container"]}>
      <button onClick={toggleDarkTheme}>{sideMenuIcons.theme}</button>
      <button onClick={() => selectItem("About")}>{sideMenuIcons.about}</button>
      <button onClick={() => selectItem("Faq")}>{sideMenuIcons.faq}</button>
    </section>
  );
};

export default SideMenuNav;
