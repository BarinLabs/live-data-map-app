import { icons } from "../Assets/icons";
import styles from "./categoriesNav.module.scss";
import { useContext } from "react";
import ThemeContext from "../../../../context/theme-context";
import LangContext from "../../../../context/lang-context";
import { translator } from "../../../../utils/translator";

const CategoriesNav = ({
  categoryNames,
  selectedCategoryName,
  setSelectedCategoryName,
}) => {
  const themeCtx = useContext(ThemeContext);
  const { isDarkTheme } = themeCtx;
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;
  const buttons = [];

  categoryNames.forEach((name) => {
    let btnIcon = "";
    let index = "";
    if (name === "Weather" || name === "Метео") {
      btnIcon = icons.weather;
      index = 0;
    } else if (name === "Particulates" || name === "Прахови частици") {
      btnIcon = icons.particulates;
      index = 1;
    } else if (name === "Gases" || name === "Газове") {
      btnIcon = icons.gases;
      index = 2;
    }

    buttons[index] = (
      <button
        key={index}
        className={
          name === selectedCategoryName
            ? isDarkTheme
              ? styles["active-btn-dark"]
              : styles["active-btn"]
            : isDarkTheme
            ? styles.button_dark
            : null
        }
        onClick={() => setSelectedCategoryName(name)}
      >
        {btnIcon}
        {name}
      </button>
    );
  });

  return <div className={styles["container"]}>{buttons}</div>;
};

export default CategoriesNav;
