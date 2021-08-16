import { useMemo, useState } from "react";
import LineChart from "../Charts/LineChart";
import styles from "./historicalData.module.scss";

const _WEATHER = "Weather";

const HistoricalData = ({ categories }) => {
  const weatherCategory = categories.find(
    (category) => category.name === _WEATHER
  );

  const [selectedPeriod, setSelectedPeriod] = useState("24 hours");

  const [selectedCategoryName, setSelectedCategoryName] = useState(() => {
    return weatherCategory ? _WEATHER : categories[0].name;
  });

  const selectedCategory = useMemo(() => {
    const currCategory = categories.find(
      (category) => category.name === selectedCategoryName
    );

    if (!currCategory) {
      const weatherCategory = categories.find(
        (category) => category.name === _WEATHER
      );

      if (weatherCategory) {
        return weatherCategory;
      }

      return categories[0];
    }

    return currCategory;
  }, [categories, selectedCategoryName]);

  const { channels } = selectedCategory;

  const [selectedChannelName, setSelectedChannelName] = useState(() => {
    if (
      selectedCategory.name === _WEATHER &&
      channels.find((channel) => channel.name === "Temperature")
    ) {
      return "Temperature";
    } else {
      return channels[0].name;
    }
  });

  const selectedChannel = useMemo(() => {
    if (selectedCategory.name === _WEATHER) {
      const tempretatureChannel = channels.find(
        (channel) => channel.name === "Temperature"
      );

      if (tempretatureChannel) {
        return tempretatureChannel;
      }

      return channels[0];
    } else {
      const channelIsFound = channels.find(
        (channel) => channel.name === selectedChannelName
      );

      if (channelIsFound) {
        return channelIsFound;
      }

      return channels[0];
    }

    return channels[0];
  }, [channels, selectedChannelName]);

  const categorySelectOptions = useMemo(() => {
    return categories.map((category) => {
      return (
        <option key={Math.random(100)} value={category.name}>
          {category.name}
        </option>
      );
    });
  }, [categories]);

  const channelsSelectOptions = useMemo(() => {
    return channels.map(({ name, token }) => {
      return (
        <option key={token} value={name}>
          {name}
        </option>
      );
    });
  }, [channels]);

  const handleCategorySelection = (event) => {
    setSelectedCategoryName(event.target.value);
  };

  const hanldeChannelSelection = (event) => {
    setSelectedChannelName(event.target.value);
  };

  const handlePeriodSelection = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div>
      <h3>Historical Data:</h3>
      <div className={styles.selectMenusContainer}>
        <select value={selectedCategoryName} onChange={handleCategorySelection}>
          {categorySelectOptions}
        </select>
        <select value={selectedChannelName} onChange={hanldeChannelSelection}>
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
    </div>
  );
};

export default HistoricalData;
