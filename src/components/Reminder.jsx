import React, { useState, useContext } from 'react';
import TimerContext from '../context/TimerContext';
import Redirector from './Redirector';

export default function Reminder() {
  const { time } = useContext(TimerContext);
  const [meetingTime, setMeetingTime] = useState();
  const [meetingLink, setMeetingLink] = useState();
  return (
    <form>
      {'Time: '}
      <input
        type="text"
        onChange={ ({ target }) => setMeetingTime(target.value) }
      />
      <hr />
      <br />
      {'Link: '}
      <input
        type="text"
        onChange={ ({ target }) => setMeetingLink(target.value) }
      />
      <hr />
      <br />
      <Redirector
        redirect={ time === meetingTime }
        url={ meetingLink }
      />
    </form>
  );
}
