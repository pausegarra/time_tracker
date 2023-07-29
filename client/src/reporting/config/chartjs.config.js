import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export function getOptions (title = 'title') {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: title,
        color: 'white'
      }
    },
  };
  return options
}