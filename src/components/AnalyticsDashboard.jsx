import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function AnalyticsDashboard({ user }) {
  const [history, setHistory] = useState([]);
  const [disciplineScore, setDisciplineScore] = useState(0);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const { data } = await supabase
      .from("savings_history")
      .select("amount, saved_at")
      .eq("user_id", user.id)
      .order("saved_at", { ascending: true });

    if (!data) return;

    const formatted = data.map((item) => ({
      date: new Date(item.saved_at).toLocaleDateString(),
      amount: Number(item.amount)
    }));

    setHistory(formatted);

    // Discipline Score = consistency based on entries
    const uniqueDays = new Set(
      formatted.map((d) => d.date)
    ).size;

    const score = Math.min(100, uniqueDays * 5);
    setDisciplineScore(score);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl space-y-8">
      <h2 className="text-2xl font-bold">📊 Savings Analytics</h2>

      {/* Discipline Score */}
      <div className="bg-gradient-to-r from-[#0A3D62] to-[#3C91E6] text-white p-6 rounded-2xl">
        <h3 className="text-lg opacity-80">Discipline Score</h3>
        <p className="text-4xl font-bold mt-2">{disciplineScore}%</p>
        <p className="text-sm opacity-80 mt-1">
          Based on your savings consistency
        </p>
      </div>

      {/* Line Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3C91E6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
