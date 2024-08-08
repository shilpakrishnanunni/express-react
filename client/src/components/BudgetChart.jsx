import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend)

const randomColorGenerator = () => {
  const golden_ratio_conjugate = 0.618033988749895;

  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 60%, 60%)`;
}

const BudgetChart = ({ chartData }) => {
  const data = {
    labels: chartData.map(item => item.label),
    datasets: [
      {
        // label: "Monthly Split Up",
        data: chartData.map(item => item.value),
        backgroundColor: chartData.map(item => randomColorGenerator()),
        borderColor: "black",
        borderWidth: 0.1,
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Pie data={data} options={options}/>;
};

export default BudgetChart;
