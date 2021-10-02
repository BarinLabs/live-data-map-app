import { useContext } from "react";
import LangContext from "../../../../context/lang-context";
import ThemeContext from "../../../../context/theme-context";
import { translator } from "../../../../utils/translator";
import { isDataRecent } from "../../../../utils/utils";
import ChannelItem from "../ChannelItem/ChannelItem";
import styles from "./channelItemsList.module.scss";

const recentDataLimitMinutes = 5;

const ChannelItemsList = ({ categoryName, channels }) => {
  const langCtx = useContext(LangContext);
  const { lang } = langCtx;

  const themeCtx = useContext(ThemeContext);
  const { isDarkTheme } = themeCtx;
  const { lastTick } = channels[0];

  const isDataNotRecent = !isDataRecent(lastTick, recentDataLimitMinutes);

  const name =
    translator.textWidgets[lang][categoryName.toLowerCase() + "Title"];

  return (
    <div className={styles["container"]}>
      <p
        className={
          isDarkTheme ? styles["category-name-dark"] : styles["category-name"]
        }
      >
        {name}:
      </p>
      <div className={styles["items-container"]}>
        {isDataNotRecent && (
          <div className={styles["no-recent-data-overlay"]}>
            <p>No recent data</p>
          </div>
        )}
        {channels.map((channel) => {
          return <ChannelItem key={channel.token} channel={channel} />;
        })}
      </div>
    </div>
  );
};

export default ChannelItemsList;
