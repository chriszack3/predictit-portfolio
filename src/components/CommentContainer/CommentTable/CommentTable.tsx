import CommentPill from '../CommentPill/CommentPill';
import { getNegCount, getPosCount, getNeutCount } from '@/constants/functions';
import { FlatPost } from '@/constants/interfaces';
import { v4 as uuidv4 } from 'uuid';

const CommentTable = ({ comments }: { comments: Array<FlatPost> }) => {
  // an array of numbers 0 - 23
  const labels = [...Array(24).keys()];
  const yAxis = labels.map((hour) => {
    return {
      time: `${hour}:00 - ${hour + 1}:00`,
      hour,
    };
  });
  return (
    <div>
      <h4 className="text-lg mb-2">{comments.length} Total Comments</h4>
      <h4 className="text-lg mb-2">
        Positive: {getPosCount(comments)} Neutral: {getNeutCount(comments)}
        {` `}
        Negative: {getNegCount(comments)}
      </h4>
      <div className="h-48 overflow-y-auto">
        {yAxis.map(({ hour, time }) => {
          return (
            <div key={uuidv4()} className="flex gap-2 mb-4">
              <h4 className="w-36 block font-bold">{time}</h4>
              <div className="w-4/12 h-24 overflow-y-auto">
                {comments
                  .filter((comment) => {
                    const { postedAtMS } = comment;
                    return new Date(postedAtMS).getHours() === hour;
                  })
                  .map((comment) => {
                    return <CommentPill key={uuidv4()} comment={comment} />;
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentTable;
