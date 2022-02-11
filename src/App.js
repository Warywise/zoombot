import React, { useContext } from 'react';
import './App.scss';
import Meeting from './components/Meeting';
import Reminder from './components/Reminder';
import TimerContext from './context/TimerContext';

function App() {
  const { time, meetings } = useContext(TimerContext);
  const timeContent = (time).match(/\d+/g) || [0, 0, 0];
  const MAX_SECOND = 50;
  const MAX_SECOND_HIDDEN = 29;
  const MAX_MINUTE = 59;
  let newTime;

  if (document.hidden) {
    newTime = +(timeContent[2]) >= MAX_SECOND_HIDDEN && +(timeContent[1]) < MAX_MINUTE
      ? { hour: timeContent[0], minute: `${+(timeContent[1]) + 1}` }
      : { hour: timeContent[0], minute: timeContent[1] };
  } else {
    newTime = +(timeContent[2]) >= MAX_SECOND && +(timeContent[1]) < MAX_MINUTE
      ? { hour: timeContent[0], minute: `${+(timeContent[1]) + 1}` }
      : { hour: timeContent[0], minute: timeContent[1] };
  }
  const MIN_MINUTE = 9;
  return (
    <main className="App">
      <header className="App-header">
        Trybe Moments Bot
      </header>
      <section>
        <h2>
          { newTime.hour }
          <b>{' : '}</b>
          { +(newTime.minute) > MIN_MINUTE ? newTime.minute : `0${+(newTime.minute)}` }
        </h2>
        <Reminder />
      </section>
      <section>
        { meetings.length > 0 && meetings
          .map((meeting, ind) => <Meeting key={ ind } meetData={ meeting } />) }
      </section>
    </main>
  );
}

export default App;
