import React, { useEffect, useState } from 'react';
import Contract, { ContractType } from '@/components/Contract/Contract';

type MarketInfo = {
  id: number;
  scrapeResult: ContractType[];
  i: number;
  timeStampMS: number;
  batchId: string;
};
const Market = ({ selectedMarket }: { selectedMarket: string }) => {
  const [data, setData] = useState<MarketInfo>({
    id: 0,
    scrapeResult: [],
    i: 0,
    timeStampMS: 0,
    batchId: ``,
  });

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3000`);
    setSocket(socket);
    socket.onopen = () => {
      console.log(`Connected to server`);
      socket.send(selectedMarket);
    };
    socket.onmessage = (message) => {
      // console.log('Message received: ', message.data);
      const data = JSON.parse(message.data);
      const scrapeResult = JSON.parse(data?.scrapeResult);
      setData({
        ...data,
        scrapeResult,
      });
    };
    socket.onclose = () => {
      console.log(`Disconnected from server`);
    };
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket?.send(selectedMarket);
  }, [selectedMarket]);

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

export default Market;
