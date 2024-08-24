import { useState, useEffect } from 'react';
import { MarketInfo } from '@/constants/interfaces';
import Market from '../components/Market/Market';

const Test = () => {
  const [data, setData] = useState<MarketInfo>({
    id: 0,
    timestamp: 0,
    name1: ``,
    price1: ``,
    bestOfferNo1: ``,
    bestOfferYes1: ``,
    betTotal1: 0,
    name2: ``,
    price2: ``,
    bestOfferNo2: ``,
    bestOfferYes2: ``,
    betTotal2: 0,
    name3: ``,
    price3: ``,
    bestOfferNo3: ``,
    bestOfferYes3: ``,
    betTotal3: 0,
    name4: ``,
    price4: ``,
    bestOfferNo4: ``,
    bestOfferYes4: ``,
    betTotal4: 0,
  });
  const [compareData, setCompareData] = useState<MarketInfo>({
    id: 0,
    timestamp: 0,
    name1: ``,
    price1: ``,
    bestOfferNo1: ``,
    bestOfferYes1: ``,
    betTotal1: 0,
    name2: ``,
    price2: ``,
    bestOfferNo2: ``,
    bestOfferYes2: ``,
    betTotal2: 0,
    name3: ``,
    price3: ``,
    bestOfferNo3: ``,
    bestOfferYes3: ``,
    betTotal3: 0,
    name4: ``,
    price4: ``,
    bestOfferNo4: ``,
    bestOfferYes4: ``,
    betTotal4: 0,
  });
  const [selectedMarket, setSelectedMarket] = useState<string>(``);
  const [selectCompare, setSelectCompare] = useState<boolean>(false);
  const [comparison, setComparison] = useState<string>(``);
  const markets = [
    `PI_WI_2024`,
    `PI_Pres_2024`,
    `Polymarket_Pres_2024`,
    `Polymarket_WI_2024`,
  ];

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const removeEmpty = (obj: Object) => {
    return Object.entries(obj)
      .filter(([_, v]) => v != null)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  };
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3000`);
    setSocket(socket);
    socket.onopen = () => {
      console.log(`Connected to server`);
      if (comparison?.length > 0 && selectedMarket?.length > 0) {
        socket.send(JSON.stringify({ compSel: [selectedMarket, comparison] }));
      } else if (selectedMarket.length > 0) {
        socket.send(JSON.stringify({ sel: [selectedMarket] }));
      }
    };
    socket.onmessage = (message) => {
      // console.log('Message received: ', message.data);
      const parsed = JSON.parse(message.data);
      if (parsed?.selectData) {
        const selectData = removeEmpty(parsed.selectData) as MarketInfo;
        const compareData = removeEmpty(parsed.compareData) as MarketInfo;
        setData(selectData);
        setCompareData(compareData);
        console.log(message);
      } else {
        const data = removeEmpty(JSON.parse(message.data)) as MarketInfo;
        setData(data);
      }
    };
    socket.onclose = () => {
      console.log(`Disconnected from server`);
    };
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (comparison?.length > 0 && selectedMarket?.length > 0) {
      socket &&
        socket.send(JSON.stringify({ compSel: [selectedMarket, comparison] }));
    } else if (selectedMarket.length > 0) {
      socket && socket.send(JSON.stringify({ sel: [selectedMarket] }));
    }
  }, [selectedMarket, comparison]);

  markets.length > 0 && console.log(markets);
  return (
    <div>
      <div className="flex">
        {markets.map((market, i) => {
          return (
            <div
              key={i}
              className="w-fit"
              style={{
                border: selectCompare
                  ? `4px dashed rgb(234, 179, 8)`
                  : `4px solid white`,
                borderRadius: `10px`,
              }}
            >
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  selectCompare
                    ? setComparison(market)
                    : setSelectedMarket(market)
                }
              >
                {market}
              </button>
            </div>
          );
        })}
        <button
          onClick={() => setSelectCompare(!selectCompare)}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          +
        </button>
      </div>
      <div>
        <h1 className="text-center text-2xl font-extrabold">Group 1</h1>
        <div className="flex justify-between">
          {selectedMarket.length > 0 && (
            <Market data={data} selectedMarket={selectedMarket} />
          )}
          {comparison.length > 0 && (
            <Market data={compareData} selectedMarket={comparison} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
