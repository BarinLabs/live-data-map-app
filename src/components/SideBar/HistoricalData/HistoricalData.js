import { useContext, useState } from "react";
import LineChart from "../Charts/LineChart";
import styles from "./historicalData.module.scss";
import CustomSwitch from "../../CustomSwitch";
import CustomSwitchDark from "../../CustomSwitchDark";
import ThemeContext from "../../../context/theme-context";
import LangContext from "../../../context/lang-context";

const HistoricalData = ({ channel }) => {
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;
  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;

  const [selectedPeriod, setSelectedPeriod] = useState("24 hours");

  const [state, setState] = useState({
    highLow: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handlePeriodSelection = (event) => {
    setSelectedPeriod((prevState) =>
      prevState === "24 hours" ? "30 days" : "24 hours"
    );
  };

  return (
    <div className={styles["container"]}>
      <h3 className={isDarkTheme ? styles["h3-dark"] : null}>
        {lang === "bg" ? "Исторически данни:" : "Historical Data:"}
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <div>
          <label className={isDarkTheme ? styles["label-dark"] : null}>
            {lang === "bg" ? "Високо/Слабо" : "High/Low"}
          </label>
          {isDarkTheme ? (
            <CustomSwitchDark
              checked={state.highLow}
              onChange={handleChange}
              name="highLow"
            />
          ) : (
            <CustomSwitch
              checked={state.highLow}
              onChange={handleChange}
              name="highLow"
            />
          )}
        </div>
        <select
          className={isDarkTheme ? styles["select-dark"] : null}
          onChange={handlePeriodSelection}
        >
          <option>{lang === "bg" ? "24 часа" : "24 hours"}</option>
          <option>{lang === "bg" ? "30 дни" : "30 days"}</option>
        </select>
      </div>

      <div>
        <LineChart
          channel={channel}
          highLow={state.highLow}
          period={selectedPeriod}
        />
      </div>
    </div>
  );
};

export default HistoricalData;
