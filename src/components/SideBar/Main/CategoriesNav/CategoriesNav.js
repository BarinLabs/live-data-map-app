import { icons } from "../Assets/icons";
import styles from "./categoriesNav.module.scss";
import { useContext } from "react";
import ThemeContext from "../../../../context/theme-context";

const CategoriesNav = ({
  categoryNames,
  selectedCategoryName,
  setSelectedCategoryName,
}) => {
  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;
  const buttons = [];

  categoryNames.forEach((name) => {
    let btnIcon = "";
    let index = "";
    if (name === "Weather") {
      btnIcon = icons.weather;
      index = 0;
    } else if (name === "Particulates") {
      btnIcon = icons.particulates;
      index = 1;
    } else if (name === "Gases") {
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
