import { useContext } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { CommentContextType } from '@/constants/interfaces';

export default function CalendarComponent({
  DateContext,
  range,
}: {
  DateContext: any;
  range: [number, number];
}) {
  const handleOnChange = (e: any) => {
    setDate(e);
  };

  const { date, setDate } = useContext<CommentContextType>(DateContext);
  return (
    <div>
      <Calendar
        minDate={new Date(range[0])}
        maxDate={new Date(range[1])}
        value={date}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
}
