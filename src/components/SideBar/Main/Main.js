import styles from "./main.module.scss";
import CategoriesNav from "./CategoriesNav/CategoriesNav";
import { useMemo, useState } from "react";
import ChannelsNav from "./ChannelsNav/ChannelsNav";
import HistoricalData from "../HistoricalData/HistoricalData";
import ChannelItemsList from "./ChannelItemsList/ChannelItemsList";

const Main = ({ token, categories }) => {
  const categoryNames = categories.map(({ name }) => name);
  const [selectedCategoryName, setSelectedCategoryName] = useState(() => {
    if (categoryNames.includes("Weather")) {
      return "Weather";
    }

    return categoryNames[0];
  });

  const selectedCategory = categories.find(
    ({ name }) => name === selectedCategoryName
  );

  const selectedChannels = selectedCategory.channels;

  const channelsNames = selectedChannels.map(({ name }) => name);

  const [selectedChannelName, setSelectedChannelName] = useState(() => {
    if (selectedCategoryName === "Weather") {
      return "Temperature";
    }

    return channelsNames[0];
  });

  if (!channelsNames.includes(selectedChannelName)) {
    if (selectedCategoryName === "Weather") {
      setSelectedChannelName("Temperature");
    } else if (selectedCategoryName === "Particulates") {
      setSelectedChannelName("PM1.0");
    } else {
      setSelectedChannelName("NO2");
    }
  }

  const historicalData = useMemo(() => {
    return (
      <HistoricalData
        channel={selectedChannels.find(
          (channel) => channel.name === selectedChannelName
        )}
      />
    );
  }, [token, selectedChannelName, selectedChannels]);

  return (
    <div className={styles["container"]}>
      <CategoriesNav
        categoryNames={categoryNames}
        selectedCategoryName={selectedCategoryName}
        setSelectedCategoryName={(name) => {
          setSelectedCategoryName(name);
        }}
      />
      <ChannelsNav
        selectedCategoryName={selectedCategoryName}
        channelsNames={channelsNames}
        selectedChannelName={selectedChannelName}
        setSelectedChannelName={(name) => {
          setSelectedChannelName(name);
        }}
      />
      {historicalData}
      <ChannelItemsList category={selectedCategory} />
    </div>
  );
};

export default Main;
