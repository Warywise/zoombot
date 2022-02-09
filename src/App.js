import React, { useContext } from 'react';
import './App.css';
import Reminder from './components/Reminder';
import TimerContext from './context/TimerContext';

function App() {
  const { time } = useContext(TimerContext);
  return (
    <main className="App">
      <header className="App-header">
        Trybe Moments Bot
      </header>
      <section>
        <h2>{ time }</h2>
        <Reminder />
      </section>
    </main>
  );
}

export default App;
