import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDevice } from "../../redux/CurrentDevice/currentDeviceSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes, faBan } from "@fortawesome/free-solid-svg-icons";
import styles from "./sideBar.module.scss";

import Weather from "./Categories/Weather/Weather";
import Gases from "./Categories/Gases/Gases";
import Particulates from "./Categories/Particulates/Particulates";
import Slugs from "./Categories/Slugs/Slugs";
import HistoricalData from "./HistoricalData/HistoricalData";
import Main from "./Layouts/Main/Main";
import AQIChart from "./Layouts/AQIChart/AQIChart";

const _WEATHER = "Weather";
const _GASES = "Gases";
const _PARTICULATES = "Particulates";

const SideBar = () => {
  const dispatch = useDispatch();

  const { device, error } = useSelector((state) => state.currentDevice);
  console.log(device);

  const { categories, status, indexes, location } = device;
  const { online, lastSubmission, lastSubmissionShort } = status;

  const getCategoryChannels = useCallback(
    (categoryName) => {
      const currCategory = categories.find(
        (category) => category.name === categoryName
      );

      return currCategory ? currCategory.channels : [];
    },
    [categories]
  );

  const weatherChannels = getCategoryChannels(_WEATHER);
  const gasesChannels = useMemo(
    () => getCategoryChannels(_GASES),
    [getCategoryChannels]
  );
  const particulatesChannels = useMemo(
    () => getCategoryChannels(_PARTICULATES),
    [getCategoryChannels]
  );

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
      </div>

      {error && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}

      {!error && (
        <div>
          <Main
            indexes={indexes}
            location={location}
            lastSubmission={lastSubmission}
          />
          <AQIChart />
          <div>
            {categories.length > 0 && (
              <HistoricalData categories={categories} />
            )}
            {/* {weatherChannels.length > 0 && <Weather channels={categories} />} */}
            {indexes.length > 0 && <Slugs slugs={indexes} />}
            {gasesChannels.length > 0 && <Gases channels={gasesChannels} />}
            {particulatesChannels.length > 0 && (
              <Particulates channels={particulatesChannels} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
