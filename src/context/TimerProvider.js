/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import TimerContext from './TimerContext';

export default function TimerProvider({ children }) {
  const [time, setTime] = useState('');
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const TEN_SECONDS = 10000;
    let intervalId;

    const interval = () => {
      const getTime = new Date().toLocaleTimeString();

      setTime(getTime);
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
