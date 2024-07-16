import { useEffect, useState, createContext } from 'react';
import { graphql } from 'gatsby';

import { FlatPost, CommentContextType } from '../constants/interfaces';
import { getDateRange } from '../constants/functions';

import CalendarComponent from '@/components/Calendar/Calendar';
import CommentContainer from '@/components/CommentContainer/CommentContainer';

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
  }, []);

  return (
    <DateContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      <CalendarComponent range={[minDate, maxDate]} DateContext={DateContext} />
      <CommentContainer DateContext={DateContext} comments={comments} />
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
