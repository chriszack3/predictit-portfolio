import { useContext } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { CommentContextType } from '@/constants/interfaces';

export default function CalendarComponent({ context }: { context: any }) {
  const handleOnChange = (e: any) => {
    setDate(e);
  };

  const { date, setDate } = useContext<CommentContextType>(context);
  console.log(date);

  return (
    <div>
      <Calendar value={date} onChange={(e) => handleOnChange(e)} />
    </div>
  );
}
