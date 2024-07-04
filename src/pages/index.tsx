import axios from 'axios';
import { useEffect, useState } from 'react';

import { Post } from '@/constants/interfaces';

import AvgSentGraph from '@/components/AvgSentGraph/AvgSentGraph';
import DifferenceGraph from '@/components/NetScoreGraph/NetScoreGraph';
import CommentTable from '@/components/CommentsTable/CommentsTable';

export default function Home() {
  const [state, setState] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get(`/api/getPosts`)
      .then((res) => setState(res?.data))
      .catch((err) => console.log(`error: `, err));
  }, []);

  const allComments: Array<Post> = [];

  state &&
    state.forEach((post) => {
      const traversePost = (thread: Post) => {
        allComments.push(thread);
        if (thread?.replies) {
          thread.replies.forEach((rep) => traversePost(rep));
        }
      };
      traversePost(post);
    });
  console.log(allComments);

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
      <CommentTable allComments={allComments} />
      {/* <div>{state && <ThreadsTable threadArr={state} />}</div> */}
    </main>
  );
}
