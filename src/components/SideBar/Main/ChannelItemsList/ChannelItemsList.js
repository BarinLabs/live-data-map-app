import { isDataRecent } from "../../../../utils/utils";
import ChannelItem from "../ChannelItem/ChannelItem";
import styles from "./channelItemsList.module.scss";

const recentDataLimitMinutes = 5;

const ChannelItemsList = ({ category }) => {
  const { channels } = category;
  const { lastTick } = channels[0];

  const isDataNotRecent = isDataRecent(lastTick, recentDataLimitMinutes);
  return (
    <div className={styles["container"]}>
      {isDataNotRecent && (
        <div className={styles["no-recent-data-overlay"]}>
          <p>No recent data</p>
        </div>
      )}
      {channels.map((channel) => {
        return <ChannelItem key={channel.token} channel={channel} />;
      })}
    </div>
  );
};

export default ChannelItemsList;
