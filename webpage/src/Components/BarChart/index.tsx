import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AQIData {
  avg_aqi: number;
  city: string;
}

interface Props{
    aqi_data: AQIData[] 
}

const AQIBarChart = ({aqi_data}:Props) => {
    
  const chartData: ChartData<"bar"> = {
    labels: aqi_data.map((d) => d.city), // Cities on Y-axis
    datasets: [
      {
        label: "Average AQI",
        data: aqi_data.map((d) => d.avg_aqi), // AQI values on X-axis
        //@ts-ignore
        backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
  
            if (!chartArea) {
              // This case happens on initial chart load
              return null;
            }
  
            const gradient = ctx.createLinearGradient(chartArea.left, 0, chart.canvas.width, 0);
        
                gradient.addColorStop(0, '#18CB30');
                gradient.addColorStop(0.5, 'yellow');
                gradient.addColorStop(1, '#DC683E');

            
  
            return gradient;
          },
          borderRadius: 6,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Average AQI" }, beginAtZero: true , max:100},
      y: { title: { display: false, text: "City" } },
    },
  };

  return (
      <div className="w-full max-w-3xl bg-white p-4 shadow-md rounded">
        <Bar data={chartData} options={chartOptions} />
      </div>
  );
};

export default AQIBarChart;
