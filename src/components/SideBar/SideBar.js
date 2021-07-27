import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDevice } from "../../redux/CurrentDevice/currentDeviceSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes, faBan } from "@fortawesome/free-solid-svg-icons";
import styles from "./sideBar.module.scss";

import Weather from "./Categories/Weather/Weather";
import Gases from "./Categories/Gases/Gases";
import Particulates from "./Categories/Particulates/Particulates";

const _WEATHER = "Weather";
const _GASES = "Gases";
const _PARTICULATES = "Particulates";

const SideBar = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.currentDevice.error);

  const device = useSelector((state) => state.currentDevice.device);
  const { data, status } = device;
  const { online, lastSubmissionShort } = status;
  const [weatherChannels, setWeatherChannels] = useState([]);
  const [gasesChannels, setGasesChannels] = useState([]);
  const [particulatesChannels, setParticulatesChannels] = useState([]);

  useEffect(() => {
    setWeatherChannels([]);
    setGasesChannels([]);
    setParticulatesChannels([]);
    if (!error) {
      data.forEach((category) => {
        const channels = category.channels;
        if (category.name === _WEATHER) {
          setWeatherChannels(channels);
        } else if (category.name === _GASES) {
          setGasesChannels(channels);
        } else if (category.name === _PARTICULATES) {
          setParticulatesChannels(channels);
        }
      });
    }
  }, [data, error]);

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
          <div>
            {weatherChannels.length > 0 && (
              <Weather channels={weatherChannels} />
            )}
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
