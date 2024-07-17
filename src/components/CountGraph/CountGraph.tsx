import { useContext } from 'react';
import { CommentContextType, FlatPost } from '@/constants/interfaces';
import { Bar } from 'react-chartjs-2';
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

const CountGraph = ({
  comments,
  DateContext,
}: {
  comments: Array<FlatPost>;
  DateContext: any;
}) => {
  const { date } = useContext<CommentContextType>(DateContext);

  const formattedDate = date.toLocaleDateString(navigator.language, {
    month: `long`,
    day: `numeric`,
    year: `numeric`,
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: `top` as const,
      },
      title: {
        display: true,
        text: `${formattedDate}`,
      },
    },
  };

  // an array of numbers 0 - 23
  const labels = [...Array(24).keys()];
  const yAxis = labels.map((hour) => {
    return `${hour}:00 - ${hour + 1}:00`;
  });

  const data = {
    labels: yAxis,
    datasets: [
      {
        label: `Number of Comments`,
        data: labels.map((label) => {
          const commentsAtHour = comments.filter((comment) => {
            const { postedAtMS } = comment;
            const hour = new Date(postedAtMS).getHours();
            return hour === label;
          });
          return commentsAtHour.length;
        }),
        backgroundColor: `rgba(255, 99, 132, 0.5)`,
      },
    ],
  };
  return (
    <div style={{ width: `35vw` }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CountGraph;
