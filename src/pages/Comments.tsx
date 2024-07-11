import axios from 'axios';
import { useEffect, useState } from 'react';

import { FlatPost } from '../constants/interfaces';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Comments() {
  const [comments, setComments] = useState<Array<FlatPost>>([]);

  const [date, setDate] = useState(new Date());
  console.log(comments);
  useEffect(() => {
    axios.get(`/api/getFlatPosts`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const handleOnChange = (e: any) => {
    console.log(Date.parse(e));
    setDate(e);
  };

  return (
    <div>
      <h1>Comments</h1>
      <Calendar value={date} onChange={(e) => handleOnChange(e)} />
    </div>
  );
}
