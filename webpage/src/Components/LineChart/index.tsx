import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


interface AQIData {
  avg_aqi: number;
  year: number;
}

interface Props{
  aqi_data:AQIData[],
}

const AvgAQILineChart = ({aqi_data}:Props) => {

  
  const chartData = {
    labels: aqi_data.map((d) => `${d.year}`),
    datasets: [
      {
        label: "Average AQI",
        data: aqi_data.map((d) => d.avg_aqi),
        borderColor: function (context:any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      
              gradient.addColorStop(0, '#18CB30');
              gradient.addColorStop(0.5, 'yellow');
              gradient.addColorStop(1, '#DC683E');

          return gradient;
        },
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        borderWidth: 2,
        pointRadius: 2.5,
        pointBackgroundColor: function (context:any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }
   
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      
              gradient.addColorStop(0, '#18CB30');
              gradient.addColorStop(0.5, 'yellow');
              gradient.addColorStop(1, '#DC683E');

          return gradient;
        },
        tension: 0.4
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: false, text: "Year" } },
      y: { title: { display: true, text: "AVG AQI" }, beginAtZero: true ,max:100},
    },
  };

  return (
      <div className="flex justify-center w-full max-w-xl bg-white p-4 shadow-md rounded">
        {/* @ts-ignore */}
        <Line data={chartData} options={chartOptions} />
      </div>
  );
};

export default AvgAQILineChart;