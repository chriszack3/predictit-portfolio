import { v4 as uuidv4 } from 'uuid';

import { Post } from '@/constants/interfaces';

import Thread from '@/components/ThreadsTable/Thread/Thread';

type ThreadsTableProps = {
  threadArr: Array<Post>;
};

export default function Home({ threadArr }: ThreadsTableProps) {
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

  return (
    <>
      {threadArr &&
        threadArr.map((post: Post) => {
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
    </>
  );
}
