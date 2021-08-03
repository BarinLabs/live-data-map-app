import styles from "./weather.module.scss";

import WeatherChart from "./WeatherChart";
import { useEffect, useMemo, useState } from "react";

const Weather = ({ channels }) => {
  const [channelSelectMenuValue, setChannelSelectMenuValue] =
    useState("Temperature");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("24 hours");

  const temperatureChannel = useMemo(
    () => channels.find((channel) => channel.name === "Temperature"),
    [channels]
  );

  const relativeHumidityChannel = useMemo(
    () => channels.find((channel) => channel.name === "Relative Humidity"),
    [channels]
  );

  const pressureChannel = useMemo(
    () => channels.find((channel) => channel.name === "Pressure"),
    [channels]
  );

  useEffect(() => {
    if (temperatureChannel) {
      setSelectedChannel(temperatureChannel);
    } else if (relativeHumidityChannel) {
      setSelectedChannel(relativeHumidityChannel);
    } else if (pressureChannel) {
      setSelectedChannel(pressureChannel);
    } else {
      setSelectedChannel(null);
    }
  }, [temperatureChannel, relativeHumidityChannel, pressureChannel]);

  const channelsSelectOptions = useMemo(() => {
    return channels.map(({ name, token }) => {
      if (name === "Temperature") {
        setChannelSelectMenuValue("Temperature");
      }

      return (
        <option key={token} value={name}>
          {name}
        </option>
      );
    });
  }, [channels]);

  const handleChannelSelection = (event) => {
    const value = event.target.value;
    setChannelSelectMenuValue(value);

    if (value === "Temperature") {
      setSelectedChannel(temperatureChannel);
    } else if (value === "Relative Humidity") {
      setSelectedChannel(relativeHumidityChannel);
    } else if (value === "Pressure") {
      setSelectedChannel(pressureChannel);
    }
  };

  const handlePeriodSelection = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div>
      <h3>Weather:</h3>
      <div className={styles.selectMenusContainer}>
        <select
          value={channelSelectMenuValue}
          onChange={handleChannelSelection}
        >
          {channelsSelectOptions}
        </select>
        <select onChange={handlePeriodSelection}>
          <option>24 hours</option>
          <option>30 days</option>
        </select>
      </div>
      <div>
        {selectedChannel && (
          <WeatherChart channel={selectedChannel} period={selectedPeriod} />
        )}
      </div>
    </div>
  );
};

export default Weather;
