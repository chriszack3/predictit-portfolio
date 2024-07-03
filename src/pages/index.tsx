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

  let oldestDate = Date.now();
  let newestDate = 0;
  state.forEach((post) => {
    if (typeof post.postedAtMS === `number`) {
      if (post.postedAtMS < oldestDate) {
        oldestDate = post.postedAtMS;
      }
      if (post.postedAtMS > newestDate) {
        newestDate = post.postedAtMS;
      }
      // post.postedAtMS < oldestDate ? oldestDate = post.postedAtMS : null
      // post.postedAtMS > newestDate ? newestDate = post.postedAtMS : null
    }
  });

  const formatDate = (date: number) => {
    return Intl.DateTimeFormat(navigator.language, {
      month: `long`,
      day: `numeric`,
      year: `numeric`,
    }).format(date);
  };

  const weekInMS = 7 * 24 * 60 * 60 * 1000;
  const weeks = [];
  let date = oldestDate;
  while (date < newestDate) {
    weeks.push(formatDate(date));
    date += weekInMS;
  }

  return (
    <main>
      <Graph labels={weeks} threadArr={state} />
      <div>{state && <ThreadsTable threadArr={state} />}</div>
    </main>
  );
}
