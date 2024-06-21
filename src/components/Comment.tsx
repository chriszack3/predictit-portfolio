import { Post } from '@/constants/interfaces';

type CommentProps = {
  post: Post;
  nested: number;
  key: number;
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
              <Comment post={rep} nested={nested + 1}></Comment>
            </div>
          );
        })}
    </div>
  );
}
