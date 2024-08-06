import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Realtime() {
  const [data, setData] = useState<any>({});
  const [countdown, setCountdown] = useState(10);
  useEffect(() => {
    if (countdown === 10) {
      axios.get(`/api/getLastRecord`).then((res) => {
        setData(res.data[0]);
      });
    }
    const interval = setInterval(() => {
      countdown > 0 ? setCountdown(countdown - 1) : setCountdown(10);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const { scrapeResult, timeStampMS } = data;
  const scrapeResultArr = scrapeResult && JSON.parse(scrapeResult);
  console.log(scrapeResultArr);

  return (
    <div>
      <h1>Realtime</h1>
      <h2>{countdown}</h2>
      {scrapeResult &&
        scrapeResultArr.map((scrape: any) => {
          return (
            <div key={scrape.id}>
              <h3>{scrape.id}</h3>
              <h3>{scrape.name}</h3>
              <h3>{scrape.price}</h3>
              <h3>{scrape.timestamp}</h3>
            </div>
          );
        })}
      <h3>{timeStampMS}</h3>
    </div>
  );
}
