import { Post } from '@/constants/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

type CommentProps = {
  post: Post;
  nested: number;
  key: string;
};

export default function Comment({ post, nested, key }: CommentProps) {
  const [showMore, setShowMore] = useState(false);

  const { opAuthor, opContent, upvotes, downvotes, postedAtMS } = post;
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
    <div key={key}>
      <p>{opAuthor}</p>
      <p>{opContent}</p>
      <p>{upvotes}</p>
      <p>{downvotes}</p>
      <p>{postedAt}</p>
      {post.replies && (
        <button onClick={() => setShowMore(!showMore)}>
          Show {replyCount} Replies
        </button>
      )}
      {post.replies &&
        showMore &&
        post.replies?.map((rep) => {
          return (
            <div
              key={key}
              style={{
                paddingLeft: 20 * nested + `px`,
                borderLeft: `2px black solid`,
              }}
            >
              <Comment key={uuidv4()} post={rep} nested={nested + 1}></Comment>
            </div>
          );
        })}
    </div>
  );
}
