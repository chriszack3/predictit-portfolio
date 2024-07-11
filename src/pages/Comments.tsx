import axios from 'axios';
import { useEffect, useState, createContext } from 'react';

import { FlatPost, CommentContextType } from '../constants/interfaces';

import CalendarComponent from '@/components/Calendar/Calendar';
import CommentContainer from '@/components/CommentContainer/CommentContainer';

import 'react-calendar/dist/Calendar.css';

export default function Comments() {
  const [comments, setComments] = useState<Array<FlatPost>>([]);
  const [date, setDate] = useState(new Date());

  const DateContext = createContext({ date, setDate } as CommentContextType);

  useEffect(() => {
    axios.get(`/api/getFlatPosts`).then((response) => {
      setComments(response.data);
    });
  }, []);

  return (
    <DateContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      <CalendarComponent DateContext={DateContext} />
      <CommentContainer DateContext={DateContext} comments={comments} />
    </DateContext.Provider>
  );
}
