import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Index = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "Sales",
              data: [65, 59, 80, 81, 56, 55],
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <canvas ref={chartRef} id="myChart"></canvas>
      </div>
    </div>
  );
};

export default Index;
