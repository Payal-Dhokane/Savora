import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function GoalForm({ session, onGoalCreated }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !targetAmount || !duration) {
      alert("Please fill all fields 💙");
      return;
    }

    const { error } = await supabase.from("goals").insert([
      {
        user_id: session.user.id,
        name: name,
        target_amount: parseFloat(targetAmount),
        duration: parseInt(duration),
        completed_days: [],
      },
    ]);

    if (error) {
      console.error(error);
      alert("Error creating goal");
    } else {
      setName("");
      setTargetAmount("");
      setDuration("");
      onGoalCreated();
    }
  };

  const dailySaving =
    targetAmount && duration
      ? (targetAmount / duration).toFixed(2)
      : 0;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        marginBottom: "30px",
        borderRadius: "12px",
        background: "#f4f8ff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3>Create New Goal 🎯</h3>

      <input
        type="text"
        placeholder="Goal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px" }}
      />

      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px" }}
      />

      <input
        type="number"
        placeholder="Duration (days)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px" }}
      />

      {targetAmount && duration && (
        <p>
          Required Daily Saving: ₹{dailySaving}
        </p>
      )}

      <button
        type="submit"
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          background: "#0A3D62",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Create Goal
      </button>
    </form>
  );
}
