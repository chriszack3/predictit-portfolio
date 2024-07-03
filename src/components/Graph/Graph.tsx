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

// type Dataset = {
//     label: string;
//     data: Array<number>;
//     borderWidth: number;
// }

type Label = string;

type Labels = Array<Label>;

type GraphProps = {
  labels: Labels;
  threadArr: Array<Post>;
};

export default function Graph({ labels, threadArr }: GraphProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: `top` as const,
      },
      title: {
        display: true,
        text: `Chart.js Bar Chart`,
      },
    },
  };

  const getWeekAvg = (startDay: Label, threadArr: Array<Post>) => {
    let weeklyTotal = 0;
    let weeklyCount = 0;
    const weekInMS = 7 * 24 * 60 * 60 * 1000;

    threadArr.forEach((thread: Post) => {
      const endDay = Date.parse(startDay) + weekInMS;
      if (thread?.result) {
        if (
          thread.postedAtMS > Date.parse(startDay) &&
          thread.postedAtMS < endDay
        ) {
          weeklyTotal += thread?.result?.documentSentiment?.score;
          weeklyCount++;
        }
      }
    });
    return [weeklyTotal, weeklyCount];
  };

  const data = {
    labels,
    datasets: [
      {
        label: `Dataset 1`,
        data: labels.map((label) => {
          const [weeklyTotal, weeklyCount] = getWeekAvg(label, threadArr);
          return weeklyTotal / weeklyCount;
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
