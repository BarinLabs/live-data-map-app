const Weather = ({ channels }) => {
  return (
    <div>
      <h3>Weather:</h3>
      <div>
        {channels.map((channel) => {
          return (
            <div key={channel.token}>
              <span>{channel.name} </span>
              <span>
                {channel.value.toFixed(0)} {channel.suffix}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Weather;
