import { useContext } from 'react';
import { FlatPost, CommentContextType } from '@/constants/interfaces';
import CommentTable from './CommentTable/CommentTable';

export default function CommentContainer({
  comments,
  DateContext,
}: {
  comments: Array<FlatPost>;
  DateContext: any;
}) {
  const { date } = useContext<CommentContextType>(DateContext);

  return (
    <div className="bg-gray-200 p-4">
      <h3 className="text-xl font-bold mb-2">{date.toDateString()}:</h3>
      <CommentTable comments={comments} />
    </div>
  );
}
