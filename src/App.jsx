import { useEffect, useState } from "react";

const App = () => {
  // Constants
  const startingDate = new Date("April 16, 2024");
  const endingDate = new Date("August 19, 2027");

  // States
  const [itsBeen, setItsBeen] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [count, setCount] = useState(0);

  const updateDays = () => {
    // Current date
    const currentTime = new Date();

    // Calculating days 'passed & remaining' in miliseconds
    const daysPassedInMs = currentTime - startingDate;
    const remainingDaysInMs = endingDate - currentTime;

    // Converting miliseconds to days
    const passed = Math.floor(daysPassedInMs / (1000 * 60 * 60 * 24));
    const remaining = Math.floor(remainingDaysInMs / (1000 * 60 * 60 * 24)) + 1;

    setItsBeen(passed < 0 ? 0 : passed);
    setRemainingDays(remaining < 0 ? 0 : remaining);
  }

  useEffect(() => {
    const interval = setInterval(updateDays, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect to show a counter
  useEffect(() => {
    let interval;

    if (!itsBeen || !remainingDays) {
      interval = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1);

      return () => clearInterval(interval);
    }
    else {
      clearInterval(interval);
    }
  }, [itsBeen, remainingDays]);

  return (
    <main className="container">
      <div className="counter-box">
        <div className="box-1">
          <p className="value">{itsBeen ? itsBeen : count}</p>
        </div>

        <div className="box-2">
          <p className="value">{remainingDays ? remainingDays : count}</p>
        </div>
      </div>
    </main>
  )
}

export default App