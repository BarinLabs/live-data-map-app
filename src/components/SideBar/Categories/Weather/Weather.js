import { useEffect, useState } from "react";
import TemperatureChart from "./TemperatureChart";

const Weather = ({ channels }) => {
  const [temperatureChannel, setTemperatureChannel] = useState({});

  useEffect(() => {
    channels.forEach((channel) => {
      if (channel.name === "Temperature") {
        setTemperatureChannel(channel);
      }
    });
  }, [channels]);

  const channelsData = channels.map((channel) => {
    return (
      <div key={channel.token}>
        <span>{channel.name} </span>
        <span>
          {channel.value.toFixed(0)} {channel.suffix}
        </span>
      </div>
    );
  });

  return (
    <div>
      <h3>Weather:</h3>
      <div>
        <TemperatureChart channel={temperatureChannel} />
      </div>
    </div>
  );
};

export default Weather;
