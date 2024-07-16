import { useContext } from 'react';
import { FlatPost, CommentContextType } from '@/constants/interfaces';
import CommentTable from './CommentTable/CommentTable';
import CountGraph from '@/components/CountGraph/CountGraph';

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
      <CountGraph date={date} comments={toRender} />
      <h3 className="text-xl font-bold mb-2">{date.toDateString()}:</h3>
      <CommentTable comments={toRender} />
    </div>
  );
}
