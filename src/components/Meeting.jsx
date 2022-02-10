import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TimerContext from '../context/TimerContext';
import Redirector from './Redirector';

export default function Meeting({ meetData: { time, title, link } }) {
  const { time: currentTime } = useContext(TimerContext);
  const [checked, setChecked] = useState(false);

  const isMeetingChecked = () => {
    if (checked) return false;

    const timeContent = (time).match(/\d+/g);
    const itsTime = +(currentTime.hour) === +(timeContent[0])
      && +(currentTime.minute) === +(timeContent[1]);

    if (itsTime) {
      setChecked(true);
      return true;
    }
    return false;
  };

  return (
    <div>
      { title
        ? `O evento "${title}", foi marcado
          para o horário de ${time} e seguirá
          o seguinte link: "${link}"`
        : `O evento foi marcado
          para o horário de ${time} e seguirá
          o seguinte link: "${link}"` }
      <Redirector redirect={ isMeetingChecked() } url={ link } />
    </div>
  );
}

Meeting.propTypes = { meetData: PropTypes.objectOf(PropTypes.string).isRequired };
