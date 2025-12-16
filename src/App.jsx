import { useEffect, useState } from "react";
import { HiMoon } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi2";

const App = () => {
  // Constants
  const startingDate = new Date("April 16, 2024");
  const endingDate = new Date("August 19, 2027");

  // States
  const [itsBeen, setItsBeen] = useState(null);
  const [remainingDays, setRemainingDays] = useState(null);
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState((localStorage.getItem("theme")) || "light");
  const [isMounted, setIsMounted] = useState(false);

  const updateDays = () => {
    // Current Date
    const currentTime = new Date();

    // Calculating days, 'passed & remaining' in miliseconds
    const daysPassedInMs = currentTime - startingDate;
    const remainingDaysInMs = endingDate - currentTime;

    // Converting miliseconds to days
    const passed = Math.floor(daysPassedInMs / (1000 * 60 * 60 * 24));
    const remaining = Math.floor(remainingDaysInMs / (1000 * 60 * 60 * 24)) + 1;

    setItsBeen(passed < 0 ? 0 : passed);
    setRemainingDays(remaining < 0 ? 0 : remaining);
  }

  // useEffect to start the day's count
  useEffect(() => {
    const interval = setInterval(updateDays, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect to show a counter
  useEffect(() => {
    let interval;

    if (itsBeen === null || remainingDays === null) {
      interval = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1);

      return () => clearInterval(interval);
    }
    else {
      clearInterval(interval);

      // Loading animation
      document.querySelector(".loading").style.animation = "loading 3s linear infinite";
    }
  }, [itsBeen, remainingDays]);

  // useEffect to control the theme toggling
  useEffect(() => {
    const body = document.querySelector("body");

    if (theme === "dark") {
      body.classList.add("dark");
    }
    else {
      body.classList.remove("dark");
    }

    if (isMounted) {
      body.classList.add("smooth");
    }

    localStorage.setItem("theme", theme);

    if (!isMounted) setIsMounted(true);
  }, [theme]);

  return (
    <main className={`container`}>
      {/* ---- Light & Dark Theme Icons ---- */}
      <div
        onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
        className="theme-icons-wrapper">
        {
          theme === "light" ? <HiMoon className="moon-icon" size={32} /> : <HiOutlineSun className="sun-icon" size={32} />
        }
      </div>

      {/* ---- Main Section ---- */}
      <div className="counter-box">
        <div className="box-1">
          <p className="value">{itsBeen !== null ? itsBeen : count}</p>
        </div>

        <div className="divider-wrapper">
          <div className="divider"></div>
          <div className="loading"></div>
        </div>

        <div className="box-2">
          <p className="value">{remainingDays !== null ? remainingDays : count}</p>
        </div>
      </div>

      {/* ---- Face Expression ---- */}
      <div className="face">
        <div className="eyes">
          <div className="eye">
            <div className="eyeball"></div>
          </div>
          <div className="eye">
            <div className="eyeball"></div>
          </div>
        </div>
        <div className="mouth"></div>
      </div>
    </main>
  )
}

export default App