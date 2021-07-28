import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

const getLast7Dates = () => {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(formatDate(d));
  }

  return result.reverse();
};

const formatDate = (date) => {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = dd + "/" + mm;
  return date;
};

const TemperatureChart = (props) => {
  const [chartData, setChartData] = useState({});
  const { token: channelToken, suffix } = props.channel;
  const { token: deviceToken } = useSelector(
    (state) => state.currentDevice.device
  );

  const generateChartData = useCallback((data) => {
    const dates = getLast7Dates();

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
          backgroundColor: "white",
        },
        {
          label: "Low",
          data,
          parsing: {
            yAxisKey: "y",
          },
          borderColor: "blue",
          backgroundColor: "white",
        },
      ],
    });
  }, []);

  const getDataForLast7Days = useCallback(async () => {
    const response = await fetch(
      `https://see.senstate.cloud/data/${deviceToken}/channel/${channelToken}`,
      {
        headers: {
          timeFrame: "lastMonth",
        },
      }
    );

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
  }, [deviceToken, channelToken, generateChartData]);

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
