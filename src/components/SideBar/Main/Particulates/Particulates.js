import ChannelItem from "../ChannelItem/ChannelItem";

const Particulates = ({ channels }) => {
  return (
    <div>
      <h3>Particulates:</h3>
      <div>
        {channels.map((channel) => (
          <ChannelItem key={channel.token} channel={channel} />
        ))}
      </div>
    </div>
  );
};

export default Particulates;
