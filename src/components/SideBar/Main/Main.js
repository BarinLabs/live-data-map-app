import styles from "./main.module.scss";
import CategoriesNav from "./CategoriesNav/CategoriesNav";
import { useEffect, useMemo, useState } from "react";
import ChannelsNav from "./ChannelsNav/ChannelsNav";
import HistoricalData from "../HistoricalData/HistoricalData";
import ChannelItemsList from "./ChannelItemsList/ChannelItemsList";

const Main = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const channels = selectedCategory.channels;

  const [selectedChannel, setSelectedChannel] = useState(channels[0]);

  useEffect(() => {
    const prevCategory = categories.find(
      (cat) => cat.name === selectedCategory.name
    );

    if (prevCategory) {
      setSelectedCategory(prevCategory);

      const prevChannel = prevCategory.channels.find(
        (chan) => chan.name === selectedChannel.name
      );
      setSelectedChannel(prevChannel);
    } else {
      setSelectedCategory(categories[0]);
      setSelectedChannel(categories[0].channels[0]);
    }
  }, [categories]);

  const handleCategorySelection = (name) => {
    let currCategory = categories.find((category) => category.name === name);
    if (currCategory.name === "Particulates") {
      const newChannels = currCategory.channels.filter(
        (channel) => channel.name !== "Particle Size"
      );
      currCategory = { ...currCategory, channels: newChannels };
    }
    setSelectedCategory(currCategory);
    setSelectedChannel(currCategory.channels[0]);
  };

  const handleChannelSelection = (name) => {
    const currChannel = channels.find((channel) => channel.name === name);
    setSelectedChannel(currChannel);
  };

  const historicalData = useMemo(() => {
    const currChannel = channels.find(
      (channel) => channel.name === selectedChannel.name
    );
    return <HistoricalData channel={currChannel} />;
  }, [selectedChannel]);

  const categoryNames = categories.map(({ name }) => name);
  const channelsNames = channels.map(({ name }) => name);

  return (
    <div className={styles["container"]}>
      <CategoriesNav
        categoryNames={categoryNames}
        selectedCategoryName={selectedCategory.name}
        setSelectedCategoryName={handleCategorySelection}
      />
      <ChannelsNav
        channelsNames={channelsNames}
        selectedChannelName={selectedChannel.name}
        setSelectedChannelName={handleChannelSelection}
      />
      {historicalData}
      <ChannelItemsList
        categoryName={selectedCategory.name}
        channels={selectedCategory.channels}
      />
    </div>
  );
};

export default Main;
