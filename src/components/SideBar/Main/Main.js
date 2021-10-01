import styles from "./main.module.scss";
import CategoriesNav from "./CategoriesNav/CategoriesNav";
import { useContext, useMemo, useState } from "react";
import ChannelsNav from "./ChannelsNav/ChannelsNav";
import HistoricalData from "../HistoricalData/HistoricalData";
import ChannelItemsList from "./ChannelItemsList/ChannelItemsList";
import LangContext from "../../../context/lang-context";

const Main = ({ token, categories }) => {
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const channels = selectedCategory.channels;

  const [selectedChannelName, setSelectedChannelName] = useState(
    channels[0].name
  );

  const historicalData = useMemo(() => {
    return (
      <HistoricalData
        channel={channels.find(
          (channel) => channel.name === selectedChannelName
        )}
      />
    );
  }, [token, selectedChannelName]);

  const handleCategorySelection = (name) => {
    let currCategory = categories.find((category) => category.name === name);
    if (
      currCategory.name === "Particulates" ||
      currCategory.name === "Прахови частици"
    ) {
      const newChannels = currCategory.channels.filter(
        (channel) => channel.name !== "Particle Size"
      );
      currCategory = { ...currCategory, channels: newChannels };
    }
    setSelectedCategory(currCategory);
    setSelectedChannelName(currCategory.channels[0].name);
  };

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
        selectedChannelName={selectedChannelName}
        setSelectedChannelName={setSelectedChannelName}
      />
      {historicalData}
      <ChannelItemsList category={selectedCategory} />
    </div>
  );
};

export default Main;
