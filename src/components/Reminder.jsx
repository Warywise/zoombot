import React, { useState, useContext } from 'react';
import TimerContext from '../context/TimerContext';
import Redirector from './Redirector';

export default function Reminder() {
  const { time } = useContext(TimerContext);
  const [meetingTime, setMeetingTime] = useState();
  return (
    <form>
      <input
        type="text"
        onChange={ ({ target }) => setMeetingTime(target.value) }
      />
      <Redirector
        redirect={ time === meetingTime }
        url="https://trybe.zoom.us/j/94275512829"
      />
    </form>
  );
}
