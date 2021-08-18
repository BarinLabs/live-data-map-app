import { Bar } from "react-chartjs-2";

import styles from "./aqichart.module.scss";

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 0,
      },
      grid: {
        display: false,
      },
    },
  },
};

const AQIChart = () => {
  const data = {
    labels: [
      "17:00",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "05:00",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "17:00",
    ],
    datasets: [
      {
        data: [
          12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3,
          5, 2, 3,
        ],
        barThickness: 14,
        borderWidth: 0,
        backgroundColor: ["rgba(121, 188, 106, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
      },
    ],
  };
  return (
    <div className={styles["container"]}>
      <p>Source: Senstate</p>
      <div className={styles["title-and-select-container"]}>
        <span>Air Quality Index (CAQI)</span>
        <select>
          <option>CAQI</option>
        </select>
      </div>
      <div className={styles["chart-container"]}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AQIChart;
