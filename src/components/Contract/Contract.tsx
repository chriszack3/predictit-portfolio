import { useEffect, useRef } from 'react';
import { ContractType } from '@/constants/interfaces';
import { v4 as uuidv4 } from 'uuid';

const Contract = ({
  name,
  price,
  bestOfferNo,
  bestOfferYes,
  betTotal,
}: any) => {
  const prevState = useRef<ContractType>({
    name,
    price,
    bestOfferNo,
    bestOfferYes,
    betTotal,
  });
  useEffect(() => {
    prevState.current.price = price;
  }, [price]);

  useEffect(() => {
    prevState.current.bestOfferNo = bestOfferNo;
  }, [bestOfferNo]);

  useEffect(() => {
    prevState.current.bestOfferYes = bestOfferYes;
  }, [bestOfferYes]);

  useEffect(() => {
    prevState.current.betTotal = betTotal;
  }, [betTotal]);

  // useEffect(() => {
  //     prevState.current.scrapedAtMS = scrapedAtMS;
  // }
  // , [scrapedAtMS]);

  const priceChange = prevState.current.price !== price;
  const bestOfferNoChange = prevState.current.bestOfferNo !== bestOfferNo;
  const bestOfferYesChange = prevState.current.bestOfferYes !== bestOfferYes;
  const betTotalChange = prevState.current.betTotal !== betTotal;
  // const priceDiff = price - (prevState.current.price || 0) > 0 ? `+${Math.round(price - (prevState.current.price || 0) * 10) / 10}` : Math.round(price - (prevState.current.price || 0) * 10) / 10;
  // const bestOfferYesDiff = bestOfferYes - (prevState.current.bestOfferYes || 0) > 0 ? `+${Math.round(bestOfferYes - (prevState.current.bestOfferYes || 0) * 10) / 10}` : Math.round(bestOfferYes - (prevState.current.bestOfferYes || 0) * 10) / 10;
  // const bestOfferNoDiff = bestOfferNo - (prevState.current.bestOfferNo || 0) > 0 ? `+${Math.round(bestOfferNo - (prevState.current.bestOfferNo || 0) * 10) / 10}` : Math.round(bestOfferNo - (prevState.current.bestOfferNo || 0) * 10) / 10;
  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`);
  };

  return (
    <div key={uuidv4()} className="bg-gray-200 p-2 mb-2 w-6/12">
      <h3 className="text-md">
        <em>{name}</em>
      </h3>
      <div className="flex gap-2">
        {price && (
          <h3
            className="text-sm h-fit w-fit"
            style={{
              backgroundColor: priceChange ? `yellow` : `transparent`,
            }}
          >
            Last Sold Yes: <strong>{price}</strong>
          </h3>
        )}
        <h3
          className="text-sm h-fit w-fit"
          style={{
            backgroundColor: bestOfferYesChange ? `yellow` : `transparent`,
          }}
        >
          Best Offer Yes: <strong>{bestOfferYes}</strong>
        </h3>
        <h3
          className="text-sm h-fit w-fit"
          style={{
            backgroundColor: bestOfferNoChange ? `yellow` : `transparent`,
          }}
        >
          Best Offer No: <strong>{bestOfferNo}</strong>
        </h3>
        {betTotal && (
          <h3
            className="text-sm h-fit w-fit"
            style={{
              backgroundColor: betTotalChange ? `yellow` : `transparent`,
            }}
          >
            Bet Total: $<strong>{numberWithCommas(betTotal)}</strong>
            {betTotalChange &&
              ` +${betTotal - (prevState?.current?.betTotal || 0)}`}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Contract;
