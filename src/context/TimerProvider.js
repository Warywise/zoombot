/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import TimerContext from './TimerContext';

export default function TimerProvider({ children }) {
  const [time, setTime] = useState('');
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const TEN_SECONDS = 10000;
    const MAX_SECOND = 50;
    const MAX_SECOND_HIDDEN = 29;
    let intervalId;
    let newTime;

    const interval = () => {
      const getTime = new Date().toLocaleTimeString();
      const timeContent = (getTime).match(/\d+/g);

      if (document.hidden) {
        newTime = Number(timeContent[2]) >= MAX_SECOND_HIDDEN
          ? { hour: timeContent[0], minute: `${Number(timeContent[1]) + 1}` }
          : { hour: timeContent[0], minute: timeContent[1] };
      } else {
        newTime = Number(timeContent[2]) >= MAX_SECOND
          ? { hour: timeContent[0], minute: `${Number(timeContent[1]) + 1}` }
          : { hour: timeContent[0], minute: timeContent[1] };
      }
      setTime(newTime);
      intervalId = window.setTimeout(interval, TEN_SECONDS);

      console.log((getTime).match(/\d+/g), document.hidden);
    };

    interval();

    return () => clearInterval(intervalId);
  }, []);

  const contextValues = { time, meetings, setMeetings };

  return (
    <TimerContext.Provider value={ contextValues }>
      { children }
    </TimerContext.Provider>
  );
}
