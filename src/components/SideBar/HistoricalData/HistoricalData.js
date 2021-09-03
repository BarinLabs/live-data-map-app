import { useEffect, useContext, useState } from "react";
import LineChart from "../Charts/LineChart";
import styles from "./historicalData.module.scss";
import CustomSwitch from "../../CustomSwitch";
import CustomSwitchDark from "../../CustomSwitchDark";
import ThemeContext from "../../../context/theme-context";

const _WEATHER = "Weather";

const HistoricalData = ({ channel }) => {
  console.log(channel);
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
    setSelectedPeriod(event.target.value);
  };

  return (
    <div style={{ padding: 10 }}>
      <h3 className={isDarkTheme ? styles["h3-dark"] : null}>
        Historical Data:
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
            High/Low
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
          <option>24 hours</option>
          <option>30 days</option>
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
