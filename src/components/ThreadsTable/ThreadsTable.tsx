import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Post } from '@/constants/interfaces';

import Thread from '@/components/ThreadsTable/Thread/Thread';

type ThreadsTableProps = {
  threadArr: Array<Post>;
};

export default function Home({ threadArr }: ThreadsTableProps) {
  const [filter, setFilter] = useState(`all`);

  let arrayToRender: Array<Post> = [];
  switch (filter) {
    case `all`:
      arrayToRender = threadArr;
      break;
    case `high`:
      arrayToRender = threadArr.toSorted((a, b) => {
        if (
          Math.abs(a?.threadAvgScore ?? 0) > Math.abs(b?.threadAvgScore ?? 0)
        ) {
          return -1;
        } else if (
          Math.abs(a?.threadAvgScore ?? 0) < Math.abs(b?.threadAvgScore ?? 0)
        ) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
  }

  return (
    <div>
      <label htmlFor="button-box">Sort By: </label>
      <div id="button-box">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setFilter(`high`)}
        >
          Highest Avg. Score
        </button>
      </div>
      {arrayToRender &&
        arrayToRender.map((post: Post) => {
          console.log(post);
          return <Thread key={uuidv4()} post={post} nested={1}></Thread>;
        })}
    </div>
  );
}
