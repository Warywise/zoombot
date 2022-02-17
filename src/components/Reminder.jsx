import React, { useState, useContext } from 'react';
import TimerContext from '../context/TimerContext';

export default function Reminder() {
  const { meetings, setMeetings } = useContext(TimerContext);
  const [meetingTime, setMeetingTime] = useState();
  const [meetingTitle, setMeetingTitle] = useState();
  const [meetingLink, setMeetingLink] = useState();
  const [warning, setWarning] = useState(false);
  const TIMEOUT = 6000;

  const createMeeting = () => {
    const MEETING_DATA = {
      time: meetingTime,
      title: meetingTitle,
      link: meetingLink,
    };

    setMeetings([...meetings, MEETING_DATA]);
    setMeetingTitle('');
    setMeetingTime('');
    setMeetingLink('');
  };

  const meetingContentVerifier = () => {
    const TimeRegex = /\d{2}\s?:\s?\d{2}/;
    const LinkRegex = /^https:\/\/.+\..+/;

    if (!TimeRegex.test(meetingTime) || !LinkRegex.test(meetingLink)) {
      setWarning(true);
      return window.setTimeout(() => setWarning(false), TIMEOUT);
    }

    createMeeting();
  };

  return (
    <form className="meeting-box">
      {'Horário: '}
      <input
        type="text"
        placeholder=" hh : mm"
        value={ meetingTime }
        onChange={ ({ target }) => setMeetingTime(target.value) }
      />
      <hr />
      <br />
      {'Titulo: '}
      <input
        type="text"
        placeholder=" Minha reunião"
        value={ meetingTitle }
        onChange={ ({ target }) => setMeetingTitle(target.value) }
      />
      <hr />
      <br />
      {'Link: '}
      <input
        type="text"
        placeholder=" https://link.example.com"
        value={ meetingLink }
        onChange={ ({ target }) => setMeetingLink(target.value) }
      />
      <hr />
      <br />
      <button type="button" onClick={ meetingContentVerifier }>
        { warning ? 'Dados Inválidos' : 'Programar Evento' }
      </button>
    </form>
  );
}
