import { useEffect, useState, useRef } from 'react';
import Contract from '@/components/Contract/Contract';
import { ContractType, MarketInfo } from '@/constants/interfaces';

const SecondsAgo = ({ date }: { date: Date }) => {
  const [seconds, setSeconds] = useState(0);
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const now = new Date();
    const diff = new Date(date);

    setSeconds((Number(now) - Number(diff)) / 1000);
    setTimeout(() => {
      setTick(!tick);
    }, 1000);
  }, [tick]);

  return <span>{seconds} seconds ago</span>;
};

const Market = ({
  selectedMarket,
  data,
}: {
  selectedMarket: string;
  data: MarketInfo;
}) => {
  const prevTimestamp = useRef<number>(0);

  const [contracts, setContracts] = useState<ContractType[]>([]);

  const [staleData, setStaleData] = useState<boolean>(false);

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

  const date = data.timestamp > 0 ? new Date(data?.timestamp) : new Date();
  return (
    <div
      style={{ backgroundColor: staleData ? `red` : `transparent` }}
      className="w-5/12 border-dashed border-2 border-gray-600 rounded pt-6 pb-6"
    >
      <h2 className="text-2xl text-center">{selectedMarket}</h2>
      {staleData && `WARNING: stale data `}
      <br />
      {`Last Scraped: `}
      <SecondsAgo date={date} />
      <div className="w-full flex flex-wrap justify-between">
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
