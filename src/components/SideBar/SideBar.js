import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDevice } from "../../redux/CurrentDevice/currentDeviceSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./sideBar.module.scss";

import Slugs from "./Main/Slugs/Slugs";
import HistoricalData from "./HistoricalData/HistoricalData";
import Header from "./Header/Header";
import AQIChart from "./AQIChart/AQIChart";
import Main from "./Main/Main";

const SideBar = () => {
  const dispatch = useDispatch();

  const { device, error } = useSelector((state) => state.currentDevice);
  console.log(device);

  const { token, categories, status, indexes, location } = device;
  const { online, lastSubmission } = status;

  const mainKey = useMemo(() => Math.random().toString(), [token]);

  return (
    <div className={styles.container}>
      <div className={styles.closeBtnAndStatusContainer}>
        <button onClick={() => dispatch(closeDevice())}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>

      {error && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}

      {!error && (
        <div>
          <Header
            indexes={indexes}
            location={location}
            lastSubmission={lastSubmission}
          />
          {indexes.length > 0 && <AQIChart token={token} indexes={indexes} />}
          <Main key={mainKey} categories={categories} />
        </div>
      )}
    </div>
  );
};

export default SideBar;
