import ChannelItem from "../ChannelItem";

const Particulates = ({ channels }) => {
  console.log(channels);

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
