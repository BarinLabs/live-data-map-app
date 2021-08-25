import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { useStore } from "react-redux";
import { formatDate } from "../../../utils/timeAndDate";

const SlugChart = (props) => {
  const store = useStore();
  const [chartState, setChartState] = useState({ labels: [], data: [] });
  const { slug } = props.slug;

  const deviceUrl = useMemo(() => {
    const { deviceURL } = store.getState().currentDevice.device;
    return `${deviceURL}/index?slug=${slug}`;
  }, [slug, store]);

  const chartData = useMemo(() => {
    const { labels, data } = chartState;
    console.log(data);
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
      ],
    };
  }, [chartState]);

  const getData = useCallback(async () => {
    const response = await fetch(deviceUrl);

    if (!response.ok) {
      throw new Error("Something went wrong.");
    }

    const data = await response.json();

    const loadedLabels = [];
    const currentValues = data.map(({ value, timeStamp }) => {
      const currentDate = new Date(timeStamp);
      const day = formatDate(currentDate);
      loadedLabels.push(day);
      return { x: value };
    });

    setChartState({ labels: loadedLabels, data: currentValues });
  }, [deviceUrl]);

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
                text: `${slug}`,
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

export default SlugChart;
