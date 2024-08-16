import { useState, useEffect } from 'react';
import axios from 'axios';
import Market from '../components/Market/Market';

const Test = () => {
  const [markets, setMarkets] = useState<any[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<string>(``);
  useEffect(() => {
    axios.get(`/api/getMarkets`).then((res) => {
      setMarkets(res.data);
    });
  }, []);
  markets.length > 0 && console.log(markets);
  return (
    <div>
      <h1>Test</h1>
      <div>
        {markets.map((market, i) => {
          return (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              key={i}
              onClick={() => setSelectedMarket(market.TABLE_NAME)}
            >
              {market.TABLE_NAME}
            </button>
          );
        })}
      </div>
      {selectedMarket.length > 0 && <Market selectedMarket={selectedMarket} />}
    </div>
  );
};

export default Test;
