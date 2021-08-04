import styles from "./weather.module.scss";

import LineChart from "../../Charts/LineChart";
import { useEffect, useMemo, useState } from "react";

const Weather = ({ channels }) => {
  const [channelSelectMenuValue, setChannelSelectMenuValue] =
    useState("Temperature");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("24 hours");
  const [categorySelected, setCategorySelected] = useState("Weather");

  useEffect(() => {
    const category = channels.find(channel => channel.name === "Weather");
    const selectedChannel = category.channels.find(channel => channel.name === "Temperature");
    setSelectedChannel(selectedChannel);
  }, []);

  const channelsSelectOptions = useMemo(() => {
    let category = channels.find(channel => channel.name === categorySelected);
    return category.channels.map(({ name, token }) => {

      return (
        <option key={token} value={name}>
          {name}
        </option>
      );
    });

  }, [categorySelected]);

  const categorySelectOptions = useMemo(() => {
    return channels.map(item => {
      return (
        <option key={Math.random(100)} value={item.name}>
          {item.name}
        </option>
      );
    });

  }, [channels]);

  const handleChannelSelection = (event) => {
    const value = event.target.value;
    const category = channels.find(channel => channel.name === categorySelected);
    const selectedChannel = category.channels.find(channel => channel.name === value);
    console.log(selectedChannel);
    setSelectedChannel(selectedChannel);
    setChannelSelectMenuValue(value);
  };

  const handleCategorySelection = (event) => {
    const value = event.target.value;
    setCategorySelected(value);
    const category = channels.find(channel => channel.name === value);
    const selectedChannel = category.channels[0];
    setSelectedChannel(selectedChannel);
    setChannelSelectMenuValue(selectedChannel.name);
  };


  const handlePeriodSelection = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div>
      <h3>Historical Data:</h3>
      <div className={styles.selectMenusContainer}>
        <select
          value={categorySelected}
          onChange={handleCategorySelection}
        >
          {categorySelectOptions}
        </select>
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
          <LineChart channel={selectedChannel} period={selectedPeriod} />
        )}
      </div>
    </div >
  );
};

export default Weather;
