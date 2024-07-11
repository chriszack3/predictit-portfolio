import { useState } from 'react';

import CommentPill from './CommentPill/CommentPill';
import { getPosCount, getNegCount, getNeutCount } from '@/constants/functions';

import { Post } from '@/constants/interfaces';

type CommentTableProps = {
  allComments: Array<Post>;
};

type Filter = 'positive' | 'negative' | 'neutral';

export default function CommentTable({ allComments }: CommentTableProps) {
  const meta = {
    commentCount: allComments.length,
    positiveCount: getPosCount(allComments),
    negativeCount: getNegCount(allComments),
    neutralCount: getNeutCount(allComments),
  };

  const [filters, setFilters] = useState<Array<Filter>>([
    `positive`,
    `negative`,
    `neutral`,
  ]);
  const arrToRender =
    // filters out comments based on filter status and sentiment score
    allComments.filter((comment) => {
      const score = comment?.result?.documentSentiment?.score || 0;
      if (score >= 0.25) {
        return filters.includes(`positive`);
      }
      if (score <= -0.25) {
        return filters.includes(`negative`);
      }
      if (score <= 0.25 && score >= -0.25) {
        return filters.includes(`neutral`);
      } else {
        return false;
      }
    });
  const handleClickCheck = (filtStr: Filter, filters: Array<Filter>) => {
    // if filter is not in filters array, add it, else remove it
    !filters.includes(filtStr)
      ? setFilters([...filters, filtStr])
      : setFilters(filters.filter((f) => f !== filtStr));
  };
  return (
    <div>
      <h5>Meta</h5># of Positive Comments: {meta.positiveCount}
      <input
        defaultChecked={true}
        type="checkbox"
        onClick={() => handleClickCheck(`positive`, filters)}
      ></input>
      # of Negative Comments: {meta.negativeCount}
      <input
        defaultChecked={true}
        type="checkbox"
        onClick={() => handleClickCheck(`negative`, filters)}
      ></input>
      # of Neutral Comments: {meta.neutralCount}
      <input
        defaultChecked={true}
        type="checkbox"
        onClick={() => handleClickCheck(`neutral`, filters)}
      ></input>
      <div className="flex flex-wrap w-3/12">
        {arrToRender.length > 0 &&
          arrToRender.map((comment, i) => {
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
