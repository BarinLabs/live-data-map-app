import { useEffect, useState } from "react";
import { formatTime } from "../../../../utils/timeAndDate";
import { icons } from "../Assets/icons";
import styles from "./updateTimer.module.scss";

const tenMinutesSecodns = 600;

const UpdateTimer = ({ lastSubmission }) => {
  const minutes = new Date(lastSubmission).getMinutes();
  let precedingRoundMinute = Math.floor(minutes / 10) * 10;

  const singularMinute = minutes - precedingRoundMinute;
  const initalSeconds = singularMinute * 60;
  const [seconds, setSeconds] = useState(initalSeconds);

  const secondsLeftToNextUpdate = tenMinutesSecodns - seconds;
  const percentToFill =
    100 - (secondsLeftToNextUpdate / tenMinutesSecodns) * 100;

  useEffect(() => {
    let timer = setTimeout(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);
    if (seconds + 1 === tenMinutesSecodns) {
      console.log("update");
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [seconds]);

  if (precedingRoundMinute === 0) {
    precedingRoundMinute = "0" + precedingRoundMinute;
  }
  const time = formatTime(lastSubmission).slice(0, 3) + precedingRoundMinute;

  return (
    <div className={styles["container"]}>
      <div
        className={styles["fill-bar"]}
        style={{ width: `${percentToFill}%` }}
      ></div>
      <div className={styles["time-container"]}>
        {icons.clock}
        <span>{`Last updated at ${time}`}</span>
      </div>
    </div>
  );
};

export default UpdateTimer;
