import { useDispatch, useSelector } from "react-redux";
import { closeDevice } from "../../redux/CurrentDevice/currentDeviceSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes, faBan } from "@fortawesome/free-solid-svg-icons";
import styles from "./sideBar.module.scss";

const SideBar = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.currentDevice.error);

  const device = useSelector((state) => state.currentDevice.device);
  const { data, status } = device;
  const { online, lastSubmissionShort } = status;

  const statusCircleColor = error ? "red" : online ? "green" : "red";
  const statusIcon = error ? (
    <FontAwesomeIcon icon={faBan} style={{ color: statusCircleColor }} />
  ) : (
    <FontAwesomeIcon icon={faCircle} style={{ color: statusCircleColor }} />
  );
  return (
    <div className={styles.container}>
      <div className={styles.closeBtnAndStatusContainer}>
        <button onClick={() => dispatch(closeDevice())}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className={styles.status}>
          <span>Status: </span>
          {statusIcon}
        </div>
      </div>

      {error && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}

      {!error && (
        <div>
          <div>Last Submission: {lastSubmissionShort}</div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
