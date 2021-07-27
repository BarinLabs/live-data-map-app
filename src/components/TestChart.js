import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";

const TestChart = () => {
  const [chartData, setChartData] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);

  const data = [
    { x: 2, y: 1 },
    { x: 3, y: 4 },
    { x: 1, y: 2 },
    { x: 3, y: 4 },
  ];

  const Chart = () => {
    setChartData({
      labels: ["22/03", "23/03", "24/03", "25/03", "26/03", "27/03"],
      datasets: [
        {
          label: "Hot",
          data: data,
          parsing: {
            yAxisKey: "x",
          },
          borderColor: "red",
          backgroundColor: "pink",
          fill: true,
          tension: 0.1,
        },
        {
          label: "Cold",
          data: data,
          parsing: {
            yAxisKey: "y",
          },
          borderColor: "blue",
          backgroundColor: "salmon",
          fill: true,
          borderWidth: "1",
        },
      ],
    });
  };
  useEffect(() => {
    Chart();
  }, []);

  return (
    <div className="App">
      {/* <h1>Bar Chart</h1> */}
      <div style={{}}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "THIaa",
                color: "red",
                fullSize: true,
                weight: "bold",
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            layout: {
              padding: -30,
            },
          }}
        />
      </div>
    </div>
  );
};

export default TestChart;
