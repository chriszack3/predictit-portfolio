import { MarketInfo } from '@/constants/interfaces';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

// const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//         {
//             label: "First dataset",
//             data: [33, 53, 85, 41, 44, 65],
//             fill: true,
//             backgroundColor: "rgba(75,192,192,0.2)",
//             borderColor: "rgba(75,192,192,1)"
//         },
//         {
//             label: "Second dataset",
//             data: [33, 25, 35, 51, 54, 76],
//             fill: false,
//             borderColor: "#742774"
//         }
//     ]
// };

const colorArr = [
  `Red`,
  `Blue`,
  `Green`,
  `Yellow`,
  `Orange`,
  `Purple`,
  `Pink`,
  `Brown`,
  `Black`,
  `Gray`,
  `Cyan`,
  `Magenta`,
  `Lime`,
  `Teal`,
  `Indigo`,
  `Violet`,
  `Fuchsia`,
  `Gold`,
  `Silver`,
  `Bronze`,
];

const PriceGraph = ({ recordArr }: { recordArr: MarketInfo[] }) => {
  const data = {
    labels: recordArr.map((record) => {
      return record.timeStampMS;
    }),
    datasets: recordArr[0].scrapeResult.map((scrapeResult, i) => {
      console.log(scrapeResult.name);
      return {
        label: scrapeResult.name,
        data: recordArr.map((record) => {
          // remove last character from price, then convert to number
          const price = record.scrapeResult[i].price.slice(0, -1);
          return price;
        }),
        backgroundColor: colorArr[i],
        borderColor: colorArr[i],
      };
    }),
  };
  return (
    <div className="w-full">
      <Line data={data} />
    </div>
  );
};

export default PriceGraph;
