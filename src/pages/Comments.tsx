import axios from 'axios';
import { useEffect, useState, createContext } from 'react';

import { FlatPost, CommentContextType } from '../constants/interfaces';

import CalendarComponent from '@/components/Calendar/Calendar';

import 'react-calendar/dist/Calendar.css';

export default function Comments() {
  const [comments, setComments] = useState<Array<FlatPost>>([]);
  const [date, setDate] = useState(new Date());

  const CommentContext = createContext({ date, setDate } as CommentContextType);

  useEffect(() => {
    axios.get(`/api/getFlatPosts`).then((response) => {
      setComments(response.data);
    });
  }, []);
  console.log(comments);

  return (
    <CommentContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      <h1>Comments</h1>
      <CalendarComponent context={CommentContext} />
    </CommentContext.Provider>
  );
}
