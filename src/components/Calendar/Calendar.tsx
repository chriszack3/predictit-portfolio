import { useContext } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { CommentContextType } from '@/constants/interfaces';

export default function CalendarComponent({
  DateContext,
}: {
  DateContext: any;
}) {
  const handleOnChange = (e: any) => {
    setDate(e);
  };

  const { date, setDate } = useContext<CommentContextType>(DateContext);

  return (
    <div>
      <Calendar value={date} onChange={(e) => handleOnChange(e)} />
    </div>
  );
}
