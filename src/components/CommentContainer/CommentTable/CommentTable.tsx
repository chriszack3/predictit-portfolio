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
    <div className="w-6/12 shadow border rounded">
      <div className="mb-4 shadow border-b p-4">
        <h4 className="text-lg mb-2">
          Total Comments: <span className="font-bold">{comments.length}</span>
        </h4>
        <h4 className="text-lg mb-2">
          Positive: <span className="font-bold">{getPosCount(comments)}</span>
          {` `}
          Neutral: <span className="font-bold">{getNeutCount(comments)}</span>
          {` `}
          Negative: <span className="font-bold">{getNegCount(comments)}</span>
        </h4>
        <div className="flex w-9/12 items-baseline">
          <p className="whitespace-nowrap pr-2">Most Negative</p>
          <div
            style={{
              // gradient element
              background: `linear-gradient(to right, red 33%, black)`,
              height: `10px`,
              width: `50%`,
            }}
          ></div>
          <div
            style={{
              // gradient element
              background: `linear-gradient(to left, green 33%, black)`,
              height: `10px`,
              width: `50%`,
            }}
          ></div>
          <span className="whitespace-nowrap pl-2">Most Positive</span>
        </div>
      </div>
      <div className="h-48 overflow-y-auto p-4">
        {yAxis.map(({ hour, time }) => {
          return (
            <div
              key={uuidv4()}
              className="flex gap-2 mb-4 border-dashed border-gray-300 border-2 rounded p-2"
            >
              <h4 className="w-36 block font-bold">{time}</h4>
              <div className="w-8/12 h-24 overflow-y-auto">
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
