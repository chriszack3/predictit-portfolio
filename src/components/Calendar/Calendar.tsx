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

  const minDate = new Date(range[0]);
  minDate.setHours(0);
  minDate.setMinutes(0);
  minDate.setSeconds(0);
  minDate.setMilliseconds(0);
  const maxDate = new Date(range[1]);
  maxDate.setHours(0);
  maxDate.setMinutes(0);
  maxDate.setSeconds(0);
  maxDate.setMilliseconds(0);

  const { date, setDate } = useContext<CommentContextType>(DateContext);
  return (
    <div>
      <Calendar
        minDate={minDate}
        maxDate={maxDate}
        value={date}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
}
