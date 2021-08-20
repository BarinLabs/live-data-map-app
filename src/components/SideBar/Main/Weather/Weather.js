import ChannelItem from "../ChannelItem/ChannelItem";

const Weather = ({ channels }) => {
  return (
    <div>
      <h3>Weather:</h3>
      <div>
        {channels.map((channel) => (
          <ChannelItem key={channel.token} channel={channel} />
        ))}
      </div>
    </div>
  );
};

export default Weather;
