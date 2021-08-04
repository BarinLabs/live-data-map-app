import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./sideMenuContent.module.scss";

const SideMenuContent = ({ item, closeContent }) => {
  return (
    <div className={styles.container}>
      <div className={styles.closeBtnContainer}>
        <button onClick={closeContent}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>
      {item}
    </div>
  );
};

export default SideMenuContent;
