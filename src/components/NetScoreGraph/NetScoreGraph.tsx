import { Bar } from 'react-chartjs-2';
import { Post } from '@/constants/interfaces';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type GraphProps = {
  threadArr: Array<Post>;
  graphTitle: string;
};

export default function Graph({ threadArr, graphTitle }: GraphProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: `top` as const,
      },
      title: {
        display: true,
        text: graphTitle || `No graph title...`,
      },
    },
  };

  const labels = threadArr
    .sort((a, b) => {
      const netScoreA = (Number(a?.upvotes) || 0) - (Number(a?.downvotes) || 0);
      const netScoreB = (Number(b?.upvotes) || 0) - (Number(b?.downvotes) || 0);
      return netScoreA - netScoreB;
    })
    .map((thread) => {
      const netScore =
        (Number(thread?.upvotes) || 0) - (Number(thread?.downvotes) || 0);
      return netScore;
    });

  const data = {
    labels,
    datasets: [
      {
        label: `Number of Replies`,
        data: threadArr.map((thread) => {
          return thread?.threadCountTotal;
        }),
        backgroundColor: `rgba(255, 99, 132, 0.5)`,
      },
    ],
  };
  return (
    <div style={{ width: `50vw` }}>
      <Bar data={data} options={options} />
    </div>
  );
}
