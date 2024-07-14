import { useContext } from 'react';
import { FlatPost, CommentContextType } from '@/constants/interfaces';
import CommentPill from '@/components/CommentContainer/CommentPill/CommentPill';
import CountGraph from '@/components/CountGraph/CountGraph';
import { getNegCount, getPosCount, getNeutCount } from '@/constants/functions';

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
    <div className="bg-gray-200 p-4">
      <h3 className="text-xl font-bold mb-2">{date.toDateString()}:</h3>
      <h4 className="text-lg mb-2">{toRender.length} Comments</h4>
      <h4 className="text-lg mb-2">
        Positive: {getPosCount(toRender)} Neutral: {getNeutCount(toRender)}
        {` `}
        Negative: {getNegCount(toRender)}
      </h4>
      <CountGraph date={date} comments={toRender} />
      {toRender.map((comment) => (
        <CommentPill key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
