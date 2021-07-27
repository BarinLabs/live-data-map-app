import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

const TemperatureChart = ({ channel: { token: channelToken, suffix } }) => {
  const [chartData, setChartData] = useState({});
  const { token: deviceToken } = useSelector(
    (state) => state.currentDevice.device
  );
  const [temperatureValues, setTemperatureValues] = useState([]);

  const last7Days = () => {
    var result = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(formatDate(d));
    }

    return result.reverse();
  };

  function formatDate(date) {
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
  }

  const days = last7Days();

  const Chart = () => {
    setChartData({
      labels: days,
      datasets: [
        {
          label: "High",
          data: temperatureValues,
          parsing: {
            yAxisKey: "x",
          },
          borderColor: "red",
          backgroundColor: "white",
        },
        {
          label: "Low",
          data: temperatureValues,
          parsing: {
            yAxisKey: "y",
          },
          borderColor: "blue",
          backgroundColor: "white",
        },
      ],
    });
  };

  const getDataForLast7Days = async () => {
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

    setTemperatureValues(currentTemperatureValues);
  };

  useEffect(() => {
    Chart();
    getDataForLast7Days().catch((e) => console.log("error", e.message));
  }, [deviceToken]);

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
