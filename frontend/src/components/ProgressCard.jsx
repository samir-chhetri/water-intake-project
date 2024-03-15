import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function ProgressCard({
  progressPercentage,
  remainingIntake,
  customIntakeValue,
  setCustomIntakeValue,
  onAddIntake,
}) {
  return (
    <div className="card">
      <div className="progress-report">
        <div className="progress-bar">
          <CircularProgressbar
            maxValue={100}
            value={progressPercentage}
            text={`${progressPercentage}%`}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: "#7DCFC6",
              textColor: "#7DCFC6",
              pathTransitionDuration: 0.5,
            })}
          />
        </div>

        <p>{remainingIntake.toFixed(2)} liters to go</p>
      </div>

      <div className="ruler"></div>

      <div className="intake">
        <div className="wrapper">
          <h2>Add your intake</h2>

          <div className="intakeInput">
            <div className="inputWrapper inner-card">
              <input
                type="number"
                value={customIntakeValue}
                onChange={(e) => setCustomIntakeValue(e.target.value)}
              />
              <span>ml</span>
            </div>
            <button
              className="button"
              onClick={() => onAddIntake(customIntakeValue)}
            >
              Add
            </button>
          </div>

          <div className="intake-predefined">
            <div className="inner-card cup" onClick={() => onAddIntake(200)}>
              <span className="material-symbols-outlined">local_cafe</span>
              <span>1 cup</span>
              <span>200 ml</span>
            </div>
            <div className="inner-card cup" onClick={() => onAddIntake(500)}>
              <span className="material-symbols-outlined">local_drink</span>
              <span>1 glass</span>
              <span>500 ml</span>
            </div>
            <div className="inner-card cup" onClick={() => onAddIntake(1000)}>
              <span className="material-symbols-outlined">water_bottle</span>
              <span>1 bottle</span>
              <span>1000 ml</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
