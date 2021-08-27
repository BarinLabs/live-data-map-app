import React, { useEffect, useCallback, useMemo, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import { useStore } from "react-redux";
import { formatDate, formatTime } from "../../../utils/timeAndDate";
import ThemeContext from "../../../context/theme-context";

const LineChart = (props) => {

  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;

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
    if (props.highLow) {
      datasets.push({
        label: "High",
        data,
        parsing: {
          yAxisKey: "x",
        },
        borderColor: "#4FC4CA",
        backgroundColor: "#4FC4CA",
        pointRadius: 1,
        fill: "-1",
        order: 10
      })
      datasets.push({
        label: "Low",
        data,
        parsing: {
          yAxisKey: "y",
        },
        borderColor: "#4FC4CA",
        backgroundColor: "#4FC4CA",
        pointRadius: 0.5,
        fill: "-1",
        order: 10
      })
    }

    datasets.push({
      label: "Average",
      data,
      parsing: {
        yAxisKey: "z",
      },
      borderColor: "#16123F",
      backgroundColor: "#16123F",
      borderDash: [5, 5],
      pointRadius: 0,
      borderWidth: 1,
      order: 1
    })

    return {
      labels: labels,
      datasets,
    };
  }, [chartState, props.highLow, props.average]);

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
      if (period === "30 days") {
        const currentDate = new Date(timeStamp);
        const day = formatDate(currentDate);
        loadedLabels.push(day);
      } else if (period === "24 hours") {
        const hour = formatTime(timeStamp);
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
                  color: isDarkTheme ? "white" : "#16123F",
                  fontWeight: 700
                },
              },
              xAxes: {
                ticks: {
                  beginAtZero: true,
                  color: isDarkTheme ? "white" : "#16123F",
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
