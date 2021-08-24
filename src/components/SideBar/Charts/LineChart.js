import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { useStore } from "react-redux";
import { formatDate } from "../../../utils/timeAndDate";

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
    const datasets = [];
    if (props.high) {
      datasets.push({
        label: "High",
        data,
        parsing: {
          yAxisKey: "x",
        },
        borderColor: "#E7222E",
        backgroundColor: "#E7222E",
      })
    }
    if (props.low) {
      datasets.push({
        label: "Low",
        data,
        parsing: {
          yAxisKey: "y",
        },
        borderColor: "#79BC6A",
        backgroundColor: "#79BC6A",
      })
    }
    if (props.average) {
      datasets.push({
        label: "Average",
        data,
        parsing: {
          yAxisKey: "z",
        },
        borderColor: "#EEC20B",
        backgroundColor: "#EEC20B",
      })
    }
    return {
      labels: labels,
      datasets,
    };
  }, [chartState, props.high, props.low, props.average]);

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
    const currentValues = data.map(({ high, low, average, timeStamp }) => {
      const currentDate = new Date(timeStamp);

      if (period === "30 days") {
        const day = formatDate(currentDate);
        loadedLabels.push(day);
      } else if (period === "24 hours") {
        const hour = currentDate.getHours() + ":00";
        loadedLabels.push(hour);
      }

      return { x: high, y: low, z: average };
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
              legend: {
                display: false,
              },
              title: {
                display: false,
                text: `${channelName} last ${period} in ${suffix}`,
              },
            },
            scales: {
              yAxes: {
                ticks: {
                  beginAtZero: true,
                  color: "#16123F",
                  fontWeight: 700
                },
              },
              xAxes: {
                ticks: {
                  beginAtZero: true,
                  color: "#16123F",
                  fontWeight: 700
                },
            },
            }
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
