import React, { useEffect, useState } from 'react';
import Contract, { ContractType } from '@/components/Contract/Contract';

type MarketInfo = {
  id: number;
  scrapeResult: ContractType[];
  i: number;
  timeStampMS: number;
  batchId: string;
};
const Test = () => {
  const [data, setData] = useState<MarketInfo>({
    id: 0,
    scrapeResult: [],
    i: 0,
    timeStampMS: 0,
    batchId: ``,
  });

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3000`);
    socket.onopen = () => {
      console.log(`Connected to server`);
    };
    socket.onmessage = (message) => {
      // console.log('Message received: ', message.data);
      setData(JSON.parse(message.data));
    };
    socket.onclose = () => {
      console.log(`Disconnected from server`);
    };
    return () => {
      socket.close();
    };
  }, []);
  data?.scrapeResult.length > 0 && console.log(data);
  const date =
    data.timeStampMS > 0 ? new Date(data?.timeStampMS).toTimeString() : `N/A`;
  const batchId = data.batchId !== `` ? data.batchId : `N/A`;
  return (
    <div>
      <h2>Last Scraped Timestamp: {date}</h2>
      <h2>Batch ID: {batchId}</h2>
      <div className="w-full flex flex-wrap">
        {data?.scrapeResult.length > 0 &&
          data.scrapeResult.map((scrape: any) => {
            const { name, price, bestOfferNo, bestOfferYes, scrapedAtMS } =
              scrape;
            return (
              <React.Fragment key={name}>
                <Contract
                  name={name}
                  price={price}
                  bestOfferNo={bestOfferNo}
                  bestOfferYes={bestOfferYes}
                  scrapedAtMS={scrapedAtMS}
                />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default Test;
