import { useEffect, useState, createContext } from 'react';
import { graphql } from 'gatsby';

import { FlatPost, CommentContextType } from '../constants/interfaces';
import { getDateRange } from '../constants/functions';

import CalendarComponent from '@/components/Calendar/Calendar';
import CommentContainer from '@/components/CommentContainer/CommentContainer';
import CountGraph from '@/components/CountGraph/CountGraph';

import 'react-calendar/dist/Calendar.css';

export default function Comments({ data }: { data: any }) {
  const [comments, setComments] = useState<Array<FlatPost>>([]);
  const [date, setDate] = useState(new Date());

  const DateContext = createContext({ date, setDate } as CommentContextType);
  const [minDate, maxDate] = getDateRange(comments);
  useEffect(() => {
    const allComments = data.allFlatPost.edges.map((edge: any) => edge.node);
    setComments(allComments);
    const [minDate] = getDateRange(allComments);
    setDate(new Date(minDate));
  }, [data.allFlatPost.edges]);
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
    <DateContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      <div className="flex items-end gap-2 pl-4">
        <CalendarComponent
          range={[minDate, maxDate]}
          DateContext={DateContext}
        />
        <CountGraph DateContext={DateContext} comments={toRender} />
      </div>
      <CommentContainer DateContext={DateContext} comments={toRender} />
    </DateContext.Provider>
  );
}

export const query = graphql`
  query MyQuery {
    allFlatPost {
      edges {
        node {
          upvotes
          postedAtMS
          parentId
          downvotes
          content
          author
          id
          result {
            documentSentiment {
              magnitude
              score
            }
            sentences {
              sentiment {
                magnitude
                score
              }
              text {
                content
              }
            }
          }
        }
      }
    }
  }
`;
