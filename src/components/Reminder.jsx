import React, { useState, useContext, useEffect } from 'react';
import TimerContext from '../context/TimerContext';

export default function Reminder() {
  const { meetings, setMeetings,
    meetingToEdit, setMeetingToEdit } = useContext(TimerContext);
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

  const editMeeting = () => {
    const MEETING_DATA = {
      time: meetingTime,
      title: meetingTitle,
      link: meetingLink,
    };

    const meetingIndex = meetings.findIndex(({ time }) => time === meetingToEdit.time);
    const newMeetingsArray = [...meetings];

    if (meetingIndex < 0) {
      newMeetingsArray.push(MEETING_DATA);
    } else newMeetingsArray.splice(meetingIndex, 1, MEETING_DATA);

    setMeetings(newMeetingsArray);
    setMeetingToEdit(null);
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

    if (meetingToEdit) {
      editMeeting();
    } else createMeeting();
  };

  const changeButton = (warn, edit) => {
    if (warn) return 'Dados Inválidos';
    return edit ? 'Salvar Alterações' : 'Programar Evento';
  };

  useEffect(() => {
    if (meetingToEdit) {
      const { time, title, link } = meetingToEdit;
      setMeetingTime(time);
      setMeetingTitle(title);
      setMeetingLink(link);
    }

    if (!meetingToEdit && meetingTime !== '') {
      setMeetingTitle('');
      setMeetingTime('');
      setMeetingLink('');
    }
  }, [meetingToEdit]);

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
        { changeButton(warning, meetingToEdit) }
      </button>
    </form>
  );
}
