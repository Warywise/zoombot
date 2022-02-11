import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TimerContext from '../context/TimerContext';
import Redirector from './Redirector';

export default function Meeting({ meetData: { time, title, link } }) {
  const { time: currentTime } = useContext(TimerContext);
  const [condition, setCondition] = useState({ redirect: false, checked: false });

  const isMeetingChecked = () => {
    if (condition.checked) return false;

    const timeContent = (time).match(/\d+/g);
    const currentTimeContent = (currentTime).match(/\d+/g);

    const itsTime = currentTimeContent[0] === timeContent[0]
      && currentTimeContent[1] === timeContent[1];

    if (itsTime) return true;
    return false;
  };

  useEffect(() => {
    if (isMeetingChecked() && !condition.checked) {
      setCondition({ redirect: true, checked: true });
    }
  }, [currentTime]);

  useEffect(() => {
    const { checked, redirect } = condition;
    if (checked && redirect) setCondition({ redirect: false, checked: true });
  }, [condition.checked]);

  return (
    <div className="meeting">
      { title
        ? (
          <p>
            O evento
            <b>{` "${title}"`}</b>
            , foi marcado para o horário de
            <b>{` "${time}h" `}</b>
            e seguirá o seguinte link:
            <b>{` "${link}"`}</b>
          </p>)
        : (
          <p>
            O evento foi marcado para o horário de
            <b>{` "${time}h" `}</b>
            e seguirá o seguinte link:
            <b>{` "${link}"`}</b>
          </p>) }
      <Redirector redirect={ condition.redirect } url={ link } />
    </div>
  );
}

Meeting.propTypes = { meetData: PropTypes.objectOf(PropTypes.string).isRequired };
