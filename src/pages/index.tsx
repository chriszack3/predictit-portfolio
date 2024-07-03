import axios from 'axios';
import { useEffect, useState } from 'react';

import { Post } from '@/constants/interfaces';

import AvgSentGraph from '@/components/AvgSentGraph/AvgSentGraph';
import DifferenceGraph from '@/components/NetScoreGraph/NetScoreGraph';
import ThreadsTable from '@/components/ThreadsTable/ThreadsTable';

export default function Home() {
  const [state, setState] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get(`/api/getPosts`)
      .then((res) => setState(res?.data))
      .catch((err) => console.log(`error: `, err));
  }, []);

  return (
    <main>
      <AvgSentGraph
        graphTitle="Weekly Average Comment Sentiment Score"
        threadArr={state}
      />
      <DifferenceGraph
        graphTitle=" Number of Replies vs. Thread Net Upvotes"
        threadArr={state}
      />
      <div>{state && <ThreadsTable threadArr={state} />}</div>
    </main>
  );
}
