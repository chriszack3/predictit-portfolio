import { Post } from '@/constants/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

type ThreadProps = {
  post: Post;
  nested: number;
  key: string;
};

export default function Thread({ post, nested, key }: ThreadProps) {
  const [showMore, setShowMore] = useState(false);
  const { opAuthor, opContent, upvotes, downvotes, postedAtMS, result } = post;
  const postedAt = Intl.DateTimeFormat(navigator.language, {
    weekday: `long`,
    month: `long`,
    day: `numeric`,
    year: `numeric`,
    hour: `numeric`,
    minute: `numeric`,
  }).format(postedAtMS);
  const replyCount = post?.replies?.length;

  return (
    <div key={key} className="w-9/12 mb-4">
      <p className="text-xl font-bold">{opAuthor}</p>
      <p className="text-gray-800">{opContent}</p>
      <div className="flex space-x-4">
        <p className="text-green-500">Upvotes: {upvotes}</p>
        <p className="text-red-500">Downvotes: {downvotes}</p>
        <p>Score: {result?.documentSentiment?.score}</p>
        {post?.threadAvgScore && (
          <p>Thread Average Score: {post?.threadAvgScore}</p>
        )}
      </div>
      <p className="text-gray-600">{postedAt}</p>
      {post.replies && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-2 text-blue-500 hover:underline"
        >
          Show {replyCount} Replies
        </button>
      )}
      {post.replies &&
        showMore &&
        post.replies?.map((rep) => {
          return (
            <div
              key={key}
              className={`border-l-2 border-black`}
              style={{ marginLeft: 10 * nested + `px` }}
            >
              <Thread key={uuidv4()} post={rep} nested={nested + 1} />
            </div>
          );
        })}
    </div>
  );
}
