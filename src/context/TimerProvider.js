/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import TimerContext from './TimerContext';

export default function TimerProvider({ children }) {
  const [time, setTime] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const ONE_SECOND = 1000;
    const intervalId = setInterval(() => {
      const getTime = new Date().toLocaleTimeString();
      setTime(getTime);
    }, ONE_SECOND);

    return () => clearInterval(intervalId);
  }, []);

  const contextValues = { time, meetings, setMeetings };

  return (
    <TimerContext.Provider value={ contextValues }>
      { children }
    </TimerContext.Provider>
  );
}
