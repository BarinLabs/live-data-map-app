import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import { useStore } from "react-redux";
import { formatDate, formatTime } from "../../../utils/timeAndDate";
import ThemeContext from "../../../context/theme-context";

import styles from "./lineChart.module.scss";
import Loader from "react-loader-spinner";

const LineChart = (props) => {
  const ctx = useContext(ThemeContext);
  let { isDarkTheme } = ctx;

  const { period } = props;
  const { token: channelToken, name: channelName, suffix } = props.channel;

  const [chartState, setChartState] = useState({ labels: [], data: [] });

  const store = useStore();
  const { channelDataURLTemplate } = store.getState().currentDevice.device;
  const channelDataURL = channelDataURLTemplate.replace(
    "{channel}",
    channelToken
  );

  const chartData = () => {
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
        order: 10,
      });
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
        order: 10,
      });
    }

    datasets.push({
      label: "Average",
      data,
      parsing: {
        yAxisKey: "z",
      },
      borderColor: isDarkTheme && !props.highLow ? "#4FC4CA" : "#16123F",
      backgroundColor: isDarkTheme && !props.highLow ? "#4FC4CA" : "#16123F",
      borderDash: [5, 5],
      pointRadius: 0,
      borderWidth: 1,
      order: 1,
    });

    return {
      labels: labels,
      datasets,
    };
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
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

      setIsLoading(false);
      setError(false);
      setChartState({ labels: loadedLabels, data: currentValues });
    };

    getData().catch((e) => {
      setIsLoading(false);
      setError(true);
    });
  }, [period, channelDataURL]);

  return (
    <div className={styles["chart-container"]}>
      {isLoading && (
        <div>
          <Loader
            className={styles.loader}
            type="Oval"
            color="rgba(22, 18, 63, 1)"
            height={30}
            width={30}
          />
        </div>
      )}
      {error && (
        <div>
          <p>Something went wrong. Please try again in few minutes.</p>
        </div>
      )}

      {!isLoading && !error && (
        <Line
          data={chartData()}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (item) =>
                    `${Number(item.formattedValue).toFixed(2)} ${suffix}`,
                },
              },
              title: {
                display: false,
                text: `${channelName} last ${period} in ${suffix}`,
              },
            },
            scales: {
              yAxes: {
                ticks: {
                  callback: function (value, index, values) {
                    return `${Number(value).toFixed(0)} ${suffix}`;
                  },
                  beginAtZero: true,
                  color: isDarkTheme ? "white" : "#16123F",
                  fontWeight: 700,
                },
              },
              xAxes: {
                ticks: {
                  beginAtZero: true,
                  color: isDarkTheme ? "white" : "#16123F",
                  fontWeight: 700,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default LineChart;
