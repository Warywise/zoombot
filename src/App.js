import React, { useContext } from 'react';
import './App.css';
import Meeting from './components/Meeting';
import Reminder from './components/Reminder';
import TimerContext from './context/TimerContext';

function App() {
  const { time, meetings } = useContext(TimerContext);
  const MIN_MINUTE = 9;
  return (
    <main className="App">
      <header className="App-header">
        Trybe Moments Bot
      </header>
      <section>
        <h2>
          { time.hour }
          <b>{' : '}</b>
          { +(time.minute) > MIN_MINUTE ? time.minute : `0${+(time.minute)}`}
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
