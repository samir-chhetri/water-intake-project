import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import GoalCard from "../components/GoalCard";
import TimerCard from "../components/TimerCard";
import ProgressCard from "../components/ProgressCard";

export default function Home() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [volume, setVolume] = useState(1);
  const onAddVolume = () => setVolume((volume) => volume + 1);
  const onDecreaseVolume = () => setVolume((volume) => volume - 1);

  const [progressPercentage, setProgressPercentage] = useState(0);
  const [customIntakeValue, setCustomIntakeValue] = useState(0);

  const remainingIntake = 0.5;

  const onAddIntake = (value) => {
    if (value > 0) {
      // todo
      console.log("added intake", value);
    }
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setIsActive(false);
          remindToDrink();
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds(seconds - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, hours, minutes, seconds]);

  const handleTimerStart = () => {
    setIsActive(true);
  };

  const handleTimerStop = () => {
    setIsActive(false);
  };

  const setIntakeGoal = () => {
    // todo
    console.log("this is your goal", volume);
  };

  const remindToDrink = () => {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!", {
        body: "Don't forget to drink water!",
      });
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!", {
            body: "Don't forget to drink water!",
          });
        }
      });
    }
  };

  return (
    <main className="page">
      <div className="wrapper">
        <div className="upper-section">
          <GoalCard
            volume={volume}
            onAddVolume={onAddVolume}
            onDecreaseVolume={onDecreaseVolume}
            setIntakeGoal={setIntakeGoal}
          />

          <TimerCard
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            setHours={setHours}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            handleTimerStart={handleTimerStart}
            handleTimerStop={handleTimerStop}
          />
        </div>

        <div className="lower-section">
          <ProgressCard
            customIntakeValue={customIntakeValue}
            onAddIntake={onAddIntake}
            progressPercentage={progressPercentage}
            remainingIntake={remainingIntake}
            setCustomIntakeValue={setCustomIntakeValue}
          />
        </div>
      </div>
    </main>
  );
}
