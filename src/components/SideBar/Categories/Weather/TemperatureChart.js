import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getLastNumOfDates } from "../../../../utils/generateDates";

const TemperatureChart = (props) => {
  const [chartData, setChartData] = useState({});
  const { token: channelToken, suffix } = props.channel;
  let { channelDataURL: channelDataURLTemplate } = useSelector(
    (state) => state.currentDevice.device
  );
  const channelDataURL = channelDataURLTemplate.replace(
    "{channel}",
    channelToken
  );

  const generateChartData = useCallback((data) => {
    const dates = getLastNumOfDates(10);

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
        timeFrame: "lastMonth",
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await response.json();
    const currentTemperatureValues = data
      .slice(data.length - 7)
      .map(({ high, low }) => {
        return { x: high, y: low };
      });

    generateChartData(currentTemperatureValues);
  }, [channelDataURL, generateChartData]);

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
                text: `Tempreture last 7 days in ${suffix}`,
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

export default TemperatureChart;
