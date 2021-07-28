import TemperatureChart from "./TemperatureChart";

const Weather = ({ channels }) => {
  const temperatureChannel = channels.find(
    (channel) => channel.name === "Temperature"
  );

  return (
    <div>
      <h3>Weather:</h3>
      <div>
        {temperatureChannel && (
          <TemperatureChart channel={temperatureChannel} />
        )}
      </div>
    </div>
  );
};

export default Weather;
