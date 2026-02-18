import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useGoals(session) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchGoals();
    }
  }, [session]);

  const fetchGoals = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setGoals(data || []);
    }

    setLoading(false);
  };

  const createGoal = async (goalData) => {
    const { error } = await supabase.from("goals").insert([
      {
        ...goalData,
        user_id: session.user.id,
        completed_days: [],
      },
    ]);

    if (error) {
      console.error("Create error:", error);
      return;
    }

    fetchGoals();
  };

  const deleteGoal = async (id) => {
    const { error } = await supabase
      .from("goals")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return;
    }

    fetchGoals();
  };

  const toggleDayCompletion = async (goal) => {
    const completed = goal.completed_days || [];
    const nextDay = completed.length + 1;

    let updatedDays;

    if (completed.includes(nextDay)) {
      updatedDays = completed.filter((d) => d !== nextDay);
    } else {
      updatedDays = [...completed, nextDay];
    }

    const { error } = await supabase
      .from("goals")
      .update({ completed_days: updatedDays })
      .eq("id", goal.id);

    if (error) {
      console.error("Update error:", error);
      return;
    }

    fetchGoals();
  };

  return {
    goals,
    loading,
    createGoal,
    deleteGoal,
    toggleDayCompletion,
    refresh: fetchGoals,
  };
}
