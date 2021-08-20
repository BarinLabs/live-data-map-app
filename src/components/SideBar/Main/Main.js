import styles from "./main.module.scss";
import CategoriesNav from "./CategoriesNav/CategoriesNav";
import { useState } from "react";
import ChannelsNav from "./ChannelsNav/ChannelsNav";

const Main = ({ categories }) => {
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

  return (
    <div className={styles["container"]}>
      <CategoriesNav
        categoryNames={categoryNames}
        selectedCategoryName={selectedCategoryName}
        setSelectedCategoryName={setSelectedCategoryName}
      />
      <ChannelsNav
        selectedCategoryName={selectedCategoryName}
        channelsNames={channelsNames}
        selectedChannelName={selectedChannelName}
        setSelectedChannelName={setSelectedChannelName}
      />
    </div>
  );
};

export default Main;
