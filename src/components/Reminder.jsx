import React, { useState, useContext } from 'react';
import TimerContext from '../context/TimerContext';

export default function Reminder() {
  const { meetings, setMeetings } = useContext(TimerContext);
  const [meetingTime, setMeetingTime] = useState();
  const [meetingTitle, setMeetingTitle] = useState();
  const [meetingLink, setMeetingLink] = useState();

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

  return (
    <form className="meeting-box">
      {'Horário: '}
      <input
        type="text"
        placeholder="hh:mm:ss"
        value={ meetingTime }
        onChange={ ({ target }) => setMeetingTime(target.value) }
      />
      <hr />
      <br />
      {'Titulo: '}
      <input
        type="text"
        placeholder="Minha reunião"
        value={ meetingTitle }
        onChange={ ({ target }) => setMeetingTitle(target.value) }
      />
      <hr />
      <br />
      {'Link: '}
      <input
        type="text"
        placeholder="https://link.example.com"
        value={ meetingLink }
        onChange={ ({ target }) => setMeetingLink(target.value) }
      />
      <hr />
      <br />
      <button type="button" onClick={ createMeeting }>
        Programar Evento
      </button>
    </form>
  );
}
