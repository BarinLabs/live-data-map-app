import { useContext } from "react";
import { icons } from "../../assets/appIcons";
import ThemeContext from "../../context/theme-context";
import LangContext from "../../context/lang-context";
import styles from "./header.module.scss";

const Header = () => {
  const langCtx = useContext(LangContext);
  const { switchLanguage } = langCtx;

  const themeCtx = useContext(ThemeContext);
  const { isDarkTheme } = themeCtx;

  let classes = [styles["container"]];
  if (isDarkTheme) {
    classes.push(styles["dark-theme"]);
  }

  return (
    <div className={classes.join(" ")}>
      {/* <button>{icons.close}</button> */}
      <div className={styles["senstate-logo-container"]}>
        {icons.senstateLogo}
      </div>
      <div className={styles["select-container"]}>
        <select onChange={switchLanguage}>
          <option>English</option>
          <option>Български</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
