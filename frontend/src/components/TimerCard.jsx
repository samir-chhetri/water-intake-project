export default function TimerCard({
  hours,
  minutes,
  seconds,
  setHours,
  setMinutes,
  setSeconds,
  handleTimerStart,
  handleTimerStop,
}) {
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
              handleTimerStop();
              setHours(parseInt(e.target.value));
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
              handleTimerStop();
              setMinutes(parseInt(e.target.value));
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
              handleTimerStop();
              setSeconds(parseInt(e.target.value));
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
          <button className="button" onClick={handleTimerStart}>
            Start
          </button>
          <button className="button danger" onClick={handleTimerStop}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
