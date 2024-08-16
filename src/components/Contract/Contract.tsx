import { useEffect, useRef } from 'react';

export type ContractType = {
  id: number;
  name: string;
  price: number;
  bestOfferNo: number;
  bestOfferYes: number;
  scrapedAtMS: number;
};

const Contract = ({
  id,
  name,
  price,
  bestOfferNo,
  bestOfferYes,
  scrapedAtMS,
}: any) => {
  const prevState = useRef<ContractType>({
    id,
    name,
    price,
    bestOfferNo,
    bestOfferYes,
    scrapedAtMS,
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

  // useEffect(() => {
  //     prevState.current.scrapedAtMS = scrapedAtMS;
  // }
  // , [scrapedAtMS]);

  return (
    <div key={id} className="bg-gray-200 p-2 mb-2 w-6/12">
      <h3 className="text-md">
        <em>{name}</em>
      </h3>
      <div className="flex gap-2">
        <h3
          className="text-sm h-fit w-fit"
          style={{
            backgroundColor:
              prevState?.current?.price !== price ? `yellow` : `transparent`,
          }}
        >
          Last Sold Yes: <strong>{price}</strong>
        </h3>
        <h3
          className="text-sm h-fit w-fit"
          style={{
            backgroundColor:
              prevState?.current?.bestOfferYes !== bestOfferYes
                ? `yellow`
                : `transparent`,
          }}
        >
          Best Offer Yes: <strong>{bestOfferYes}</strong>
        </h3>
        <h3
          className="text-sm h-fit w-fit"
          style={{
            backgroundColor:
              prevState?.current?.bestOfferNo !== bestOfferNo
                ? `yellow`
                : `transparent`,
          }}
        >
          Best Offer No: <strong>{bestOfferNo}</strong>
        </h3>
        <h3 className="text-sm h-fit w-fit">
          Scraped At: {new Date(scrapedAtMS).toTimeString()}
        </h3>
      </div>
    </div>
  );
};

export default Contract;
