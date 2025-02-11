import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import GoalCard from "../components/GoalCard";
import TimerCard from "../components/TimerCard";
import ProgressCard from "../components/ProgressCard";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export default function Home() {
  const { user } = useAuth();
  const accessToken = user?.accessToken;

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleTimerStart = () => {
    setIsActive(true);
  };

  const handleTimerStop = () => {
    setIsActive(false);
  };

  const [intakeGoal, setIntakeGoal] = useState(1);
  const onAddVolume = () => setIntakeGoal((volume) => volume + 1);
  const onDecreaseVolume = () => setIntakeGoal((volume) => volume - 1);

  const [progressPercentage, setProgressPercentage] = useState(0);
  const [customIntakeValue, setCustomIntakeValue] = useState(0);

  const [remainingIntake, setRemainingIntake] = useState(1);

  const onAddIntake = async (value) => {
    if (parseInt(value) > 0) {
      try {
        const res = await axios.patch(
          "/api/intake/add",
          { intakeAmount: parseInt(value) },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        const { intake } = res.data;

        const percentage = (intake.waterIntake / intake.intakeGoal) * 100;

        if (percentage > 100) {
          setProgressPercentage(100);
        } else {
          setProgressPercentage(Math.round(percentage * 100) / 100);
        }

        const remainingIntake = intake.intakeGoal - intake.waterIntake;
        if (remainingIntake < 0) {
          setRemainingIntake(0);
        } else {
          setRemainingIntake(remainingIntake);
        }

        setCustomIntakeValue(0);
      } catch (error) {
        console.error(error);
      }
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

  const submitIntakeGoal = async () => {
    try {
      const response = await axios.post(
        "/api/intake/goal",
        {
          intakeGoal,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // console.log(response.data);

      const intake = response.data.intake;

      const percentage = (intake.waterIntake / intake.intakeGoal) * 100;

      if (percentage > 100) {
        setProgressPercentage(100);
      } else {
        setProgressPercentage(Math.round(percentage * 100) / 100);
      }

      const remainingIntake = intake.intakeGoal - intake.waterIntake;
      if (remainingIntake < 0) {
        setRemainingIntake(0);
      } else {
        setRemainingIntake(remainingIntake);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const remindToDrink = () => {
  //   if (!("Notification" in window)) {
  //     // Check if the browser supports notifications
  //     alert("This browser does not support desktop notification");
  //   } else if (Notification.permission === "granted") {
  //     // Check whether notification permissions have already been granted;
  //     // if so, create a notification
  //     const notification = new Notification("Hi there!", {
  //       body: "Don't forget to drink water!",
  //     });
  //   } else if (Notification.permission !== "denied") {
  //     // We need to ask the user for permission
  //     Notification.requestPermission().then((permission) => {
  //       // If the user accepts, let's create a notification
  //       if (permission === "granted") {
  //         const notification = new Notification("Hi there!", {
  //           body: "Don't forget to drink water!",
  //         });
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/intake", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        const { intakeGoal, waterIntake } = res.data;

        setIntakeGoal(intakeGoal);

        const percentage = (waterIntake / intakeGoal) * 100;
        if (percentage > 100) {
          setProgressPercentage(100);
        } else {
          setProgressPercentage(Math.round(percentage * 100) / 100);
        }

        const remainingIntake = intakeGoal - waterIntake;
        if (remainingIntake < 0) {
          setRemainingIntake(0);
        } else {
          setRemainingIntake(remainingIntake);
        }

        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="page">
      <div className="wrapper">
        <div className="upper-section">
          <GoalCard
            volume={intakeGoal}
            onAddVolume={onAddVolume}
            onDecreaseVolume={onDecreaseVolume}
            submitIntakeGoal={submitIntakeGoal}
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
