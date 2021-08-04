import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./particulates.module.scss";

import {
  faBraille,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Particulates = ({ channels }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };
  return (
    <div>
      <h3>Particulates:</h3>
      <div>
        {channels.map((channel) => {
          const standard = channel.standards[0];
          return (
            <div
              key={channel.token}
              className={styles.channelContainer}
              onClick={toggleCollapse}
            >
              <div className={styles.mainContainer}>
                <div className={styles.iconAndStatusContainer}>
                  <div className={styles.statusContainer}>
                    <div className={styles.iconContainer}>
                      <FontAwesomeIcon icon={faBraille} size="lg" />
                    </div>
                  </div>
                </div>
                <div className={styles.dataContainer}>
                  <span>{channel.name} </span>
                  {standard && <span>{standard.percentage * 100}%</span>}
                  <span>
                    {channel.value.toFixed(0)} {channel.suffix}
                  </span>
                </div>
                <div className={styles.collapseBtn}>
                  {isCollapseOpen ? (
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  )}
                </div>
              </div>
              {isCollapseOpen && (
                <div className={styles.descriptionContainer}>
                  <h6>European standard quality index</h6>
                  <p>
                    loerm
                    loermlroaromdaimsdiasmdnaindsiasndiansdindasindisandian
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Particulates;
