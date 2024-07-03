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

type GraphProps = {
  threadArr: Array<Post>;
  graphTitle: string;
  dataTitle: string;
};

export default function Graph({
  threadArr,
  graphTitle,
  dataTitle,
}: GraphProps) {
  const formatForAvgSent = (state: Array<Post>) => {
    let oldestDate = Date.now();
    let newestDate = 0;
    state.forEach((post) => {
      if (typeof post.postedAtMS === `number`) {
        if (post.postedAtMS < oldestDate) {
          oldestDate = post.postedAtMS;
        }
        if (post.postedAtMS > newestDate) {
          newestDate = post.postedAtMS;
        }
        // post.postedAtMS < oldestDate ? oldestDate = post.postedAtMS : null
        // post.postedAtMS > newestDate ? newestDate = post.postedAtMS : null
      }
    });

    const formatDate = (date: number) => {
      return Intl.DateTimeFormat(navigator.language, {
        month: `long`,
        day: `numeric`,
        year: `numeric`,
      }).format(date);
    };

    const weekInMS = 7 * 24 * 60 * 60 * 1000;
    const weeks = [];
    let date = oldestDate;
    while (date < newestDate) {
      weeks.push(formatDate(date));
      date += weekInMS;
    }
    return weeks;
  };
  const labels = formatForAvgSent(threadArr);
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

  const getWeekAvg = (startDay: string, threadArr: Array<Post>) => {
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
        label: dataTitle || `No data title...`,
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
