import { useEffect, useMemo, useState } from "react";
import LineChart from "../Charts/LineChart";
import styles from "./historicalData.module.scss";
import Switch from "@material-ui/core/Switch";
import CustomSwitch from "../../CustomSwitch";

const _WEATHER = "Weather";

const HistoricalData = ({ categories, category, channel }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("24 hours");
  const [selectedChannel, setSelectedChannel] = useState(null);

  const [state, setState] = useState({
    low: true,
    high: true,
    average: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    let currCategory = categories.find((t) => t.name === category);

    if (!currCategory) {
      currCategory = categories.find((t) => t.name === _WEATHER);

      currCategory = categories[0];
    }
    const { channels } = currCategory;
    const currChannel = channels.find((t) => t.name === channel);
    if (currChannel) {
      setSelectedChannel(currChannel);
    } else if (category === "Particulates") {
      setSelectedChannel(channels.find((c) => c.name === "PM1.0"));
    } else if (category === "Gases") {
      setSelectedChannel(channels.find((c) => c.name === "NO2"));
    } else if (category === "Weather") {
      setSelectedChannel(channels.find((c) => c.name === "Temperature"));
    }
  }, [categories, category, channel]);

  const handlePeriodSelection = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div style={{ padding: 10 }}>
      <h3>Historical Data:</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <label>High</label>
        <CustomSwitch
          checked={state.high}
          onChange={handleChange}
          name="high"
        />
        <label>Low</label>
        <CustomSwitch checked={state.low} onChange={handleChange} name="low" />
        <label>Average</label>
        <CustomSwitch
          checked={state.average}
          onChange={handleChange}
          name="average"
        />
        <select onChange={handlePeriodSelection}>
          <option>24 hours</option>
          <option>30 days</option>
        </select>
      </div>

      <div>
        {selectedChannel && (
          <LineChart
            channel={selectedChannel}
            high={state.high}
            low={state.low}
            average={state.average}
            period={selectedPeriod}
          />
        )}
      </div>
    </div>
  );
};

export default HistoricalData;
