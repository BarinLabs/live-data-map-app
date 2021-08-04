import ChannelItem from "../ChannelItem";

const Gases = ({ channels }) => {
  return (
    <div>
      <h3>Gases:</h3>
      <div>
        {channels.map((channel) => (
          <ChannelItem key={channel.token} channel={channel} />
        ))}
      </div>
    </div>
  );
};

export default Gases;
