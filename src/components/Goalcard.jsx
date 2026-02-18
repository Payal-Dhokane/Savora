import { Trash2 } from "lucide-react";
import CircularProgress from "./CircularProgress";

export default function GoalCard({ goal, updateGoal, deleteGoal }) {
  const progress = (goal.completed_days.length / goal.duration) * 100;

  const toggleDay = (day) => {
    let updated;
    if (goal.completed_days.includes(day)) {
      updated = goal.completed_days.filter((d) => d !== day);
    } else {
      updated = [...goal.completed_days, day];
    }

    updateGoal({ ...goal, completed_days: updated });
  };

  return (
    <div className="p-6 rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{goal.name}</h3>
        <button onClick={() => deleteGoal(goal.id)}>
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex justify-center my-4">
        <CircularProgress percentage={progress} />
      </div>


      <p className="text-sm opacity-70 text-center">
        Target: ₹{goal.amount} | Daily: ₹{goal.daily.toFixed(2)}
      </p>

      <div className="grid grid-cols-7 gap-2 mt-4">
        {Array.from({ length: goal.duration }, (_, i) => (
          <input
            key={i}
            type="checkbox"
            checked={goal.completed_days.includes(i)}
            onChange={() => toggleDay(i)}
            className="accent-[#3C91E6] scale-110"
          />
        ))}
      </div>
    </div>
  );
}