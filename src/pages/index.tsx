import Title from '@/components/Title';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Post } from '@/constants/interfaces';

import Thread from '@/components/Thread';

export default function Home() {
  const [state, setState] = useState<Array<Post>>([]);

  const getAvgScore = (thread: Post) => {
    let scoreTotal = 0;
    let countTotal = 0;
    const traversePost = (thread: Post) => {
      if (thread?.result) {
        countTotal++;
        scoreTotal += thread?.result?.documentSentiment?.score;
        if (thread?.replies) {
          thread.replies.forEach((thr) => {
            traversePost(thr);
          });
        }
      }
    };
    traversePost(thread);
    return [scoreTotal, countTotal];
  };

  useEffect(() => {
    axios
      .get(`/api/getPosts`)
      .then((res) => setState(res?.data))
      .catch((err) => console.log(`error: `, err));
  }, []);
  return (
    <main>
      <Title>Hello TypeScript!</Title>
      <div>
        {state &&
          state.map((post) => {
            const [scoreTotal, countTotal] = getAvgScore(post);
            const avgScore = scoreTotal / countTotal;

            return (
              <Thread
                key={uuidv4()}
                threadData={{ avgScore }}
                post={post}
                nested={1}
              ></Thread>
            );
          })}
      </div>
    </main>
  );
}
