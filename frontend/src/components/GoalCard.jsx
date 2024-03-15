import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

export default function GoalCard({
  volume,
  onAddVolume,
  onDecreaseVolume,
  submitIntakeGoal,
}) {
  return (
    <div className="card goal-card">
      <img className="image" src="/images/water.png" />

      <div className="controls">
        <button className="control-button" onClick={onDecreaseVolume}>
          <FaCircleMinus size={25} />
        </button>
        <span>
          <span className="goal">{volume}</span> lt
        </span>
        <button className="control-button" onClick={onAddVolume}>
          <FaCirclePlus size={25} />
        </button>
      </div>

      <p>Set your daily hydration goals</p>

      <button className="button" onClick={submitIntakeGoal}>
        Set
      </button>
    </div>
  );
}
