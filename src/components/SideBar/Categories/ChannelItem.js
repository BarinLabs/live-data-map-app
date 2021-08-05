import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./channelItem.module.scss";

import {
  faBraille,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const ChannelItem = ({ channel }) => {
  const [definedStandards, setDefinedStandards] = useState();
  const { name, value, suffix, standards } = channel;
  const standard = standards[0];
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  useEffect(() => {
    if (standard && !definedStandards) {
      fetchStandards();
    }
  }, [standard, definedStandards]);

  const fetchStandards = async () => {
    const res = await fetch(
      "https://open-data.senstate.cloud/assets/standards"
    );

    if (!res.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await res.json();
    setDefinedStandards(data);
  };

  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };

  let statusColor = "grey";
  let percentage = "";
  if (standard) {
    const currPercentage = standard.percentage * 100;
    statusColor =
      currPercentage <= 50 ? "green" : currPercentage <= 75 ? "yellow" : "red";

    percentage = Math.round(currPercentage) + "%";
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
            {
              definedStandards.find(
                (currStand) => currStand.slug === standard.standard
              ).name
            }
            : {standard.limit} {suffix}
          </h6>
          <p>{standard.description}</p>
        </div>
      )}
    </div>
  );
};

export default ChannelItem;
