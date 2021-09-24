import { useEffect, useState } from "react";
import { formatTime } from "../../../../utils/timeAndDate";
import { translator } from "../../../../utils/translator";
import { icons } from "../Assets/icons";
import styles from "./updateTimer.module.scss";

const updateDeviceIndexMinute = 10;
const updateDeviceIndexSeconds = updateDeviceIndexMinute * 60;

const UpdateTimer = ({ updateHeader, lang }) => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const precedingRoundMinute = Math.floor(minutes / 10) * 10;
  let roundMinutes = precedingRoundMinute;
  if (roundMinutes === 0) {
    roundMinutes = "0" + roundMinutes;
  }

  const [time, setTime] = useState(`${hours}:${roundMinutes}`);

  const singularMinute = minutes - precedingRoundMinute;

  const initalSeconds = singularMinute * 60;
  const [seconds, setSeconds] = useState(initalSeconds);

  const secondsLeftToNextUpdate = updateDeviceIndexSeconds - seconds;
  const percentToFill = (
    100 -
    (secondsLeftToNextUpdate / updateDeviceIndexSeconds) * 100
  ).toFixed(1);

  useEffect(() => {
    let timerID = setTimeout(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);

    if (seconds + 1 === updateDeviceIndexSeconds) {
      clearTimeout(timerID);
      setTime(`${hours}:${roundMinutes}`);
      updateHeader();
    }

    return () => {
      clearTimeout(timerID);
    };
  }, [seconds]);

  return (
    <div className={styles["container"]}>
      <div
        className={styles["fill-bar"]}
        style={{ width: `${percentToFill}%` }}
      ></div>
      <div className={styles["time-container"]}>
        {icons.clock}
        <span>{`${translator.textVarious[lang].lastCalculated} ${time}`}</span>
      </div>
    </div>
  );
};

export default UpdateTimer;
