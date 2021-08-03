import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getLastNumOfDates } from "../../../../utils/generateDates";

const WeatherChart = (props) => {
  const [chartData, setChartData] = useState({});
  const [labels, setLabels] = useState("");
  const { period } = props;
  const { token: channelToken, name: channelName, suffix } = props.channel;
  let { channelDataURL: channelDataURLTemplate } = useSelector(
    (state) => state.currentDevice.device
  );
  const channelDataURL = channelDataURLTemplate.replace(
    "{channel}",
    channelToken
  );

  const generateChartData = useCallback((data) => {
    const dates = getLastNumOfDates(30);

    setChartData({
      labels: dates,
      datasets: [
        {
          label: "High",
          data,
          parsing: {
            yAxisKey: "x",
          },
          borderColor: "red",
          backgroundColor: "red",
        },
        {
          label: "Low",
          data,
          parsing: {
            yAxisKey: "y",
          },
          borderColor: "blue",
          backgroundColor: "blue",
        },
      ],
    });
  }, []);

  const getDataForLast7Days = useCallback(async () => {
    const response = await fetch(channelDataURL, {
      headers: {
        timeFrame: period === "30 days" ? "lastMonth" : "last24h",
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await response.json();
    console.log(data);
    const currentTemperatureValues = data.map(({ high, low }) => {
      return { x: high, y: low };
    });

    generateChartData(currentTemperatureValues);
  }, [period, channelDataURL, generateChartData]);

  useEffect(() => {
    getDataForLast7Days().catch((e) => console.log("error", e.message));
  }, [getDataForLast7Days]);

  return (
    <div className="App">
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `${channelName} last ${period} in ${suffix}`,
              },
            },
            scales: {
              yAxes: {
                ticks: {
                  beginAtZero: true,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default WeatherChart;
