/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import getTimeStringUnits from '../handlers/getTimeStringUnits';
import TimerContext from './TimerContext';

// const defaultTestMeeting = { time: '19:45', title: 'Cinema', link: 'https://google.com' };

export default function TimerProvider({ children }) {
  const [time, setTime] = useState('');
  const [meetings, setMeetings] = useState([]);
  const [meetingToEdit, setMeetingToEdit] = useState(null);
  // const [checkedMeetings, setCheckedMeetings] = useState([]);

  useEffect(() => {
    const TEN_SECONDS = 10000;
    let intervalId;

    const interval = () => {
      const getTime = new Date().toLocaleTimeString();
      const timeStringUnits = getTimeStringUnits(getTime);

      setTime(timeStringUnits);
      intervalId = window.setTimeout(interval, TEN_SECONDS);
    };

    interval();

    return () => clearInterval(intervalId);
  }, []);

  const contextValues = {
    time,
    meetings,
    setMeetings,
    meetingToEdit,
    setMeetingToEdit,
    // checkedMeetings,
    // setCheckedMeetings,
  };

  return (
    <TimerContext.Provider value={ contextValues }>
      { children }
    </TimerContext.Provider>
  );
}
