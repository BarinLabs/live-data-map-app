import { icons } from "../Assets/icons";
import styles from "./categoriesNav.module.scss";

const CategoriesNav = ({
  categoryNames,
  selectedCategoryName,
  setSelectedCategoryName,
}) => {
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
        className={name === selectedCategoryName ? styles["active-btn"] : null}
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
