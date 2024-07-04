import CommentPill from './CommentPill/CommentPill';

import { getPosCount, getNegCount, getNeutCount } from '@/constants/functions';

import { Post } from '@/constants/interfaces';

type CommentTableProps = {
  allComments: Array<Post>;
};

export default function CommentTable({ allComments }: CommentTableProps) {
  const meta = {
    commentCount: allComments.length,
    positiveCount: getPosCount(allComments),
    negativeCount: getNegCount(allComments),
    neutralCount: getNeutCount(allComments),
  };
  return (
    <div>
      <h5>Meta</h5>
      <p># of Positive Comments: {meta.positiveCount}</p>
      <p># of Negative Comments: {meta.negativeCount}</p>
      <p># of Neutral Comments: {meta.neutralCount}</p>
      <div className="flex flex-wrap w-3/12">
        {allComments.length > 0 &&
          allComments.map((comment, i) => {
            return (
              <span key={i}>
                <CommentPill post={comment} />
              </span>
            );
          })}
      </div>
    </div>
  );
}
