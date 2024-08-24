import { useEffect, useState, useRef } from 'react';
import Contract from '@/components/Contract/Contract';
import { ContractType, MarketInfo } from '@/constants/interfaces';

const Market = ({ selectedMarket }: { selectedMarket: string }) => {
  const [data, setData] = useState<MarketInfo>({
    id: 0,
    i: 0,
    timestamp: 0,
  });

  const prevTimestamp = useRef<number>(0);

  const [contracts, setContracts] = useState<ContractType[]>([]);

  const [staleData, setStaleData] = useState<boolean>(false);

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
      socket.send(selectedMarket);
    };
    socket.onmessage = (message) => {
      // console.log('Message received: ', message.data);
      const data = removeEmpty(JSON.parse(message.data)) as MarketInfo;
      setData(data);
      console.log(data);
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

  useEffect(() => {
    console.log(data.timestamp, prevTimestamp.current);
    if (prevTimestamp.current !== data.timestamp) {
      prevTimestamp.current = data.timestamp;
      setStaleData(false);
    } else {
      setStaleData(true);
    }
  }, [data]);

  useEffect(() => {
    const contractCount = (Object.keys(data).length - 3) / 4;
    const contracts = [];
    for (let i = 0; i < contractCount; i++) {
      const nameKey = `name${i + 1}` as keyof MarketInfo;
      const priceKey = `price${i + 1}` as keyof MarketInfo;
      const bestOfferNoKey = `bestOfferNo${i + 1}` as keyof MarketInfo;
      const bestOfferYesKey = `bestOfferYes${i + 1}` as keyof MarketInfo;
      const betTotalKey = `betTotal${i + 1}` as keyof MarketInfo;
      const contract = {
        name: data[nameKey],
        price: data[priceKey],
        bestOfferNo: data[bestOfferNoKey],
        bestOfferYes: data[bestOfferYesKey],
        betTotal: data?.[betTotalKey],
      };
      contracts.push(contract);
    }
    setContracts(contracts as ContractType[]);
  }, [data]);

  const date =
    data.timestamp > 0 ? new Date(data?.timestamp).toTimeString() : `N/A`;
  return (
    <div>
      <button
        onClick={() =>
          setContracts([{ ...contracts[0], price: `52.3` }, ...contracts])
        }
      >
        Click
      </button>

      <h2 style={{ backgroundColor: staleData ? `red` : `green` }}>
        Market: {selectedMarket}Last Scraped Timestamp: {date}
      </h2>
      <div className="w-full flex flex-wrap">
        {contracts.length > 0 &&
          contracts.map((contract, i) => {
            return (
              <Contract
                key={i}
                name={contract.name}
                price={contract.price}
                bestOfferNo={contract.bestOfferNo}
                bestOfferYes={contract.bestOfferYes}
                betTotal={contract.betTotal}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Market;
