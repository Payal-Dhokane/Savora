import { supabase } from "../lib/supabase";
import GoalForm from "./GoalForm";
import SummaryCard from "./SummaryCard";
import useGoals from "../hooks/useGoals";

export default function Dashboard({ session }) {
  const { goals, loading, createGoal, deleteGoal, toggleDayCompletion } =
    useGoals(session);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>🔥 Savora Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <GoalForm createGoal={createGoal} />

      <SummaryCard goals={goals} />

      <h2>Your Goals</h2>

      {goals.length === 0 && <p>No goals yet. Add one!</p>}

      {goals.map((goal) => {
        const progress =
          (goal.completed_days?.length || 0) / goal.duration * 100;

        return (
          <div
            key={goal.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>{goal.title}</h3>
            <p>Duration: {goal.duration} days</p>
            <p>Progress: {progress.toFixed(0)}%</p>

            <button onClick={() => toggleDayCompletion(goal)}>
              Mark Today Complete
            </button>

            <button
              onClick={() => deleteGoal(goal.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
