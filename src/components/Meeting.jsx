import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TimerContext from '../context/TimerContext';
import Redirector from './Redirector';

export default function Meeting({ meetData: { time, title, link } }) {
  const { time: currentTime } = useContext(TimerContext);
  return (
    <div>
      { title
        ? `O evento "${title}", foi marcado
          para o horário de ${time} e seguirá
          o seguinte link: "${link}"`
        : `O evento foi marcado
          para o horário de ${time} e seguirá
          o seguinte link: "${link}"` }
      <Redirector redirect={ currentTime === time } url={ link } />
    </div>
  );
}

Meeting.propTypes = { meetData: PropTypes.objectOf(PropTypes.string).isRequired };
