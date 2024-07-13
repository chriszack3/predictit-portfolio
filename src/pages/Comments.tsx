import axios from 'axios';
import { useEffect, useState, createContext } from 'react';

import { FlatPost, CommentContextType } from '../constants/interfaces';
import { getDateRange } from '../constants/functions';

import CalendarComponent from '@/components/Calendar/Calendar';
import CommentContainer from '@/components/CommentContainer/CommentContainer';

import 'react-calendar/dist/Calendar.css';

export default function Comments() {
  const [comments, setComments] = useState<Array<FlatPost>>([]);
  const [date, setDate] = useState(new Date());

  const DateContext = createContext({ date, setDate } as CommentContextType);

  useEffect(() => {
    axios
      .get(`/api/getFlatPosts`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [minDate, maxDate] = getDateRange(comments);

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
