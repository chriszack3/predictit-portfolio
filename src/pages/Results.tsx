import { useState, useEffect } from 'react';
import axios from 'axios';
import PriceGraph from '../components/PriceGraph/PriceGraph';

const Results = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get(`/api/getAllRecords`).then((res) => setRecords(res.data));
  }, []);
  return (
    <div className="w-6/12">
      <h1>Results</h1>
      {records.length > 0 && <PriceGraph recordArr={records} />}
    </div>
  );
};

export default Results;
