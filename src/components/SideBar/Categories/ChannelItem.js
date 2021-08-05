import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./channelItem.module.scss";

import {
  faBraille,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useStore } from "react-redux";

const ChannelItem = ({ channel }) => {
  const store = useStore();
  const { standardsArr: definedStandards } = store.getState().definedStandards;
  const { name, value, suffix, standards } = channel;
  const standard = standards[0];
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };

  let statusColor = "grey";
  let percentage = "";
  let standardName = "";
  if (standard) {
    const currPercentage = standard.percentage * 100;
    statusColor =
      currPercentage <= 50 ? "green" : currPercentage <= 75 ? "yellow" : "red";

    percentage = Math.round(currPercentage) + "%";

    const standardSlug = standard.standard;
    const backupStandardName = standardSlug + " regulations";
    const matchingStandard = definedStandards.find(
      (currStand) => currStand.slug === standardSlug
    );
    standardName = matchingStandard
      ? matchingStandard.name
      : backupStandardName;
  }

  return (
    <div className={styles.channelContainer} onClick={toggleCollapse}>
      <div className={styles.mainContainer}>
        <div className={styles.iconAndStatusContainer}>
          <div
            className={styles.statusContainer}
            style={{ backgroundColor: statusColor }}
          >
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faBraille} size="lg" />
            </div>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <span>{name} </span>
          {standard && <span>{percentage}</span>}
          <span>
            {value.toFixed(0)} {suffix}
          </span>
        </div>
        {standard && (
          <div className={styles.collapseBtn}>
            {isCollapseOpen ? (
              <FontAwesomeIcon icon={faArrowUp} size="sm" />
            ) : (
              <FontAwesomeIcon icon={faArrowDown} size="sm" />
            )}
          </div>
        )}
      </div>
      {standard && isCollapseOpen && (
        <div className={styles.descriptionContainer}>
          <h6>
            {standardName}: {standard.limit} {suffix}
          </h6>
          <p>{standard.description}</p>
        </div>
      )}
    </div>
  );
};

export default ChannelItem;
