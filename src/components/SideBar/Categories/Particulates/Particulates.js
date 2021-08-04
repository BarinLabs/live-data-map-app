import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./particulates.module.scss";

import { faBraille } from "@fortawesome/free-solid-svg-icons";

const Particulates = ({ channels }) => {
  console.log(channels);
  return (
    <div>
      <h3>Particulates:</h3>
      <div>
        {channels.map((channel) => {
          return (
            <div key={channel.token} className={styles.channelContainer}>
              <div className={styles.iconAndStatusContainer}>
                <div className={styles.statusContainer}>
                  <div className={styles.iconContainer}>
                    <FontAwesomeIcon icon={faBraille} size="lg" />
                  </div>
                </div>
              </div>
              <div className={styles.dataContainer}>
                <span>{channel.name} </span>
                <span>
                  {channel.value.toFixed(0)} {channel.suffix}
                </span>
              </div>
              <div className={styles.collapseBtn}></div>
              {/* <div className={styles.descriptionContainer}></div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Particulates;
