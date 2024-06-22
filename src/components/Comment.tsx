import { Post } from '@/constants/interfaces';
import { v4 as uuidv4 } from 'uuid';

type CommentProps = {
  post: Post;
  nested: number;
  key: string;
};

export default function Comment({ post, nested, key }: CommentProps) {
  return (
    <div key={key}>
      <p>{post.opAuthor}</p>
      <p>{post.opContent}</p>
      <p>{post.upvotes}</p>
      <p>{post.downvotes}</p>
      {post.replies &&
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
