import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { useStore } from "react-redux";
import { formatDate } from "../../../utils/generateDates";

const LineChart = (props) => {
  const store = useStore();
  const [chartState, setChartState] = useState({ labels: [], data: [] });
  const { period } = props;
  const { token: channelToken, name: channelName, suffix } = props.channel;

  const channelDataURL = useMemo(() => {
    const { channelDataURLTemplate } = store.getState().currentDevice.device;
    return channelDataURLTemplate.replace("{channel}", channelToken);
  }, [channelToken, store]);

  const chartData = useMemo(() => {
    const { labels, data } = chartState;

    return {
      labels: labels,
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
    };
  }, [chartState]);

  const getData = useCallback(async () => {
    const response = await fetch(channelDataURL, {
      headers: {
        timeFrame: period === "30 days" ? "lastMonth" : "last24h",
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await response.json();

    const loadedLabels = [];
    const currentValues = data.map(({ high, low, timeStamp }) => {
      const currentDate = new Date(timeStamp);

      if (period === "30 days") {
        const day = formatDate(currentDate);
        loadedLabels.push(day);
      } else if (period === "24 hours") {
        const hour = currentDate.getHours() + ":00";
        loadedLabels.push(hour);
      }

      return { x: high, y: low };
    });

    setChartState({ labels: loadedLabels, data: currentValues });
  }, [period, channelDataURL]);

  useEffect(() => {
    getData().catch((e) => console.log("error", e.message));
  }, [getData]);

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

export default LineChart;
