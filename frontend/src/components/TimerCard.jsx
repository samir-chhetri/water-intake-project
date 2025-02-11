// export default function TimerCard({
//   hours,
//   minutes,
//   seconds,
//   setHours,
//   setMinutes,
//   setSeconds,
//   handleTimerStart,
//   handleTimerStop,
// }) {
//   return (
//     <div className="card timer-card">
//       <div className="wrapper">
//         <h2>Remind me every</h2>

//         <div className="timer">
//           <select
//             name="hour"
//             id="hour"
//             value={hours}
//             onChange={(e) => {
//               handleTimerStop();
//               setHours(parseInt(e.target.value));
//             }}
//           >
//             {Array.from({ length: 24 }, (_, i) => {
//               const hour = i < 10 ? `0${i}` : i;
//               return (
//                 <option key={i} value={i}>
//                   {hour}
//                 </option>
//               );
//             })}
//           </select>

//           <span className="separator">:</span>

//           <select
//             name="minute"
//             id="minute"
//             value={minutes}
//             onChange={(e) => {
//               handleTimerStop();
//               setMinutes(parseInt(e.target.value));
//             }}
//           >
//             {Array.from({ length: 60 }, (_, i) => {
//               const minute = i < 10 ? `0${i}` : i;
//               return (
//                 <option key={i} value={i}>
//                   {minute}
//                 </option>
//               );
//             })}
//           </select>

//           <span className="separator">:</span>

//           <select
//             name="second"
//             id="second"
//             value={seconds}
//             onChange={(e) => {
//               handleTimerStop();
//               setSeconds(parseInt(e.target.value));
//             }}
//           >
//             {Array.from({ length: 60 }, (_, i) => {
//               const second = i < 10 ? `0${i}` : i;
//               return (
//                 <option key={i} value={i}>
//                   {second}
//                 </option>
//               );
//             })}
//           </select>
//         </div>

//         <div className="buttons">
//           <button className="button" onClick={handleTimerStart}>
//             Start
//           </button>
//           <button className="button danger" onClick={handleTimerStop}>
//             Stop
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect, useRef } from "react";
// export default function TimerCard() {
//   const [initialHours, setInitialHours] = useState(0);
//   const [initialMinutes, setInitialMinutes] = useState(0);
//   const [initialSeconds, setInitialSeconds] = useState(0);
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [isActive, setIsActive] = useState(false);

//   const timerRef = useRef(null);

//   var counter = 1;
//   const startTimer = () => {
//     setIsActive(true);
//     if (counter > 1) {
//       const remindToDrink = () => {
//         if (!("Notification" in window)) {
//           // Check if the browser supports notifications
//           alert("This browser does not support desktop notification");
//         } else if (Notification.permission === "granted") {
//           // Check whether notification permissions have already been granted;
//           // if so, create a notification
//           const notification = new Notification("Hi there!", {
//             body: "Don't forget to drink water!",
//           });
//         } else if (Notification.permission !== "denied") {
//           // We need to ask the user for permission
//           Notification.requestPermission().then((permission) => {
//             // If the user accepts, let's create a notification
//             if (permission === "granted") {
//               const notification = new Notification("Hi there!", {
//                 body: "Don't forget to drink water!",
//               });
//             }
//           });
//         }
//       };
//       remindToDrink();
//       console.log("fasffdasds", counter);
//     }
//     console.log(counter);
//     counter = counter + 1;
//   };

//   const stopTimer = () => {
//     setIsActive(false);
//     clearInterval(timerRef.current);
//   };

//   const resetTimer = () => {
//     setIsActive(false);
//     setHours(initialHours);
//     setMinutes(initialMinutes);
//     setSeconds(initialSeconds);
//     clearInterval(timerRef.current);
//     startTimer();
//   };

//   useEffect(() => {
//     if (isActive) {
//       timerRef.current = setInterval(() => {
//         if (seconds > 0) {
//           setSeconds((prevSeconds) => prevSeconds - 1);
//         } else if (minutes > 0) {
//           setMinutes((prevMinutes) => prevMinutes - 1);
//           setSeconds(59);
//         } else if (hours > 0) {
//           setHours((prevHours) => prevHours - 1);
//           setMinutes(59);
//           setSeconds(59);
//         } else {
//           resetTimer();
//         }
//       }, 1000);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [isActive, seconds, minutes, hours]);

//   return (
//     <div className="card timer-card">
//       <div className="wrapper">
//         <h2>Remind me every</h2>

//         <div className="timer">
//           <select
//             name="hour"
//             id="hour"
//             value={hours}
//             onChange={(e) => {
//               stopTimer();
//               const newHours = parseInt(e.target.value);
//               setHours(newHours);
//               setInitialHours(newHours);
//             }}
//           >
//             {Array.from({ length: 24 }, (_, i) => {
//               const hour = i < 10 ? `0${i}` : i;
//               return (
//                 <option key={i} value={i}>
//                   {hour}
//                 </option>
//               );
//             })}
//           </select>

//           <span className="separator">:</span>

//           <select
//             name="minute"
//             id="minute"
//             value={minutes}
//             onChange={(e) => {
//               stopTimer();
//               const newMinutes = parseInt(e.target.value);
//               setMinutes(newMinutes);
//               setInitialMinutes(newMinutes);
//             }}
//           >
//             {Array.from({ length: 60 }, (_, i) => {
//               const minute = i < 10 ? `0${i}` : i;
//               return (
//                 <option key={i} value={i}>
//                   {minute}
//                 </option>
//               );
//             })}
//           </select>

//           <span className="separator">:</span>

//           <select
//             name="second"
//             id="second"
//             value={seconds}
//             onChange={(e) => {
//               stopTimer();
//               const newSeconds = parseInt(e.target.value);
//               setSeconds(newSeconds);
//               setInitialSeconds(newSeconds);
//             }}
//           >
//             {Array.from({ length: 60 }, (_, i) => {
//               const second = i < 10 ? `0${i}` : i;
//               return (
//                 <option key={i} value={i}>
//                   {second}
//                 </option>
//               );
//             })}
//           </select>
//         </div>

//         <div className="buttons">
//           <button className="button" onClick={startTimer}>
//             Start
//           </button>
//           <button className="button danger" onClick={stopTimer}>
//             Stop
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

export default function TimerCard() {
  const [initialHours, setInitialHours] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);

  const timerRef = useRef(null);

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

  const startTimer = () => {
    setIsActive(true);
    if (hasStartedOnce) {
      remindToDrink();
    }
    setHasStartedOnce(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    setHasStartedOnce(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    clearInterval(timerRef.current);
    startTimer();
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          resetTimer();
        }
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, seconds, minutes, hours]);

  return (
    <div className="card timer-card">
      <div className="wrapper">
        <h2>Remind me every</h2>

        <div className="timer">
          <select
            name="hour"
            id="hour"
            value={hours}
            onChange={(e) => {
              stopTimer();
              const newHours = parseInt(e.target.value);
              setHours(newHours);
              setInitialHours(newHours);
            }}
          >
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i < 10 ? `0${i}` : i;
              return (
                <option key={i} value={i}>
                  {hour}
                </option>
              );
            })}
          </select>

          <span className="separator">:</span>

          <select
            name="minute"
            id="minute"
            value={minutes}
            onChange={(e) => {
              stopTimer();
              const newMinutes = parseInt(e.target.value);
              setMinutes(newMinutes);
              setInitialMinutes(newMinutes);
            }}
          >
            {Array.from({ length: 60 }, (_, i) => {
              const minute = i < 10 ? `0${i}` : i;
              return (
                <option key={i} value={i}>
                  {minute}
                </option>
              );
            })}
          </select>

          <span className="separator">:</span>

          <select
            name="second"
            id="second"
            value={seconds}
            onChange={(e) => {
              stopTimer();
              const newSeconds = parseInt(e.target.value);
              setSeconds(newSeconds);
              setInitialSeconds(newSeconds);
            }}
          >
            {Array.from({ length: 60 }, (_, i) => {
              const second = i < 10 ? `0${i}` : i;
              return (
                <option key={i} value={i}>
                  {second}
                </option>
              );
            })}
          </select>
        </div>

        <div className="buttons">
          <button className="button" onClick={startTimer}>
            Start
          </button>
          <button className="button danger" onClick={stopTimer}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
