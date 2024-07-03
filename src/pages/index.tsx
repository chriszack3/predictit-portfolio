import axios from 'axios';
import { useEffect, useState } from 'react';

import { Post } from '@/constants/interfaces';

import Graph from '@/components/Graph/Graph';
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
      <Graph threadArr={state} />
      <div>{state && <ThreadsTable threadArr={state} />}</div>
    </main>
  );
}
