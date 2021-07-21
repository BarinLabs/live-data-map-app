import SideMenuBar from "./SideMenuBar";
import SideMenuContent from "./SideMenuContent";

import styles from "./sideMenu.module.scss";
import { useState } from "react";

const SideMenu = () => {
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [currItem, setCurrItem] = useState("");

  const handleItemSelection = (itemTitle) => {
    if (currItem !== itemTitle) {
      setIsItemSelected(true);
      setCurrItem(itemTitle);
    } else {
      closeContent();
    }
  };

  const closeContent = () => {
    setIsItemSelected(false);
    setCurrItem("");
  };

  return (
    <div className={styles.container}>
      <SideMenuBar
        selectItem={handleItemSelection}
        closeContent={closeContent}
      />
      {isItemSelected && <SideMenuContent item={currItem} />}
    </div>
  );
};

export default SideMenu;
