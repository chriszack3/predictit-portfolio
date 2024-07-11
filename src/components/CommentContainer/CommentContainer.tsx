import { useContext } from 'react';
import { FlatPost, CommentContextType } from '@/constants/interfaces';
import CommentPill from '@/components/CommentContainer/CommentPill/CommentPill';

export default function CommentContainer({
  comments,
  DateContext,
}: {
  comments: Array<FlatPost>;
  DateContext: any;
}) {
  const { date } = useContext<CommentContextType>(DateContext);
  const toRender = comments.filter((comment) => {
    const { postedAtMS } = comment;
    const dayInMS = 86400000;
    const [start, end] = [
      Date.parse(date as any),
      Date.parse(date as any) + dayInMS,
    ];
    return postedAtMS >= start && postedAtMS <= end;
  });
  return (
    <div>
      {toRender.map((comment) => (
        <CommentPill key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
