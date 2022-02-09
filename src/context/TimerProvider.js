/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import TimerContext from './TimerContext';

export default function TimerProvider({ children }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const ONE_SECOND = 1000;
    const intervalId = setInterval(() => {
      const getTime = new Date().toLocaleTimeString();
      setTime(getTime);
    }, ONE_SECOND);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TimerContext.Provider value={ { time } }>
      { children }
    </TimerContext.Provider>
  );
}
