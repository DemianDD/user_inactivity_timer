import React  from 'react';
import './App.css';
import useInactivity from './hooks/useInactivity';

function App() {
  const TIME_REMAINING = 1 * 15 * 1000; // 1 minute

  const callback1 = () => {
    console.log('You are inactive');
    setActive('Inactive');
  }

  const callback2 = () => {
    console.log("You are a long period inactive. The system will log you out.");
    setActive('Logged Out');
  }

  const { active, setActive, resetTimer, formatTimeLeft } = useInactivity(TIME_REMAINING, callback1, callback2);

  return (
    <div className="App">
      <div>
        <div>Time left:</div>
        <div>{formatTimeLeft()}</div>
      </div>
      <div>
        <div>Press button to make user active</div>
        <button onClick={resetTimer}>Press me</button>
      </div>
      <div>
        <p>User is</p>
        <div>{active}</div>
      </div>
    </div>
  );
}

export default App;
