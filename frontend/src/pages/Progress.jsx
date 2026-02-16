import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../pages/Navbar";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Progress() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    weight: "",
    calories: "",
    steps: ""
  });

  const fetchProgress = () => {
    api.get("/progress/me").then(res => setData(res.data));
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const addProgress = async () => {
    const today = new Date().toISOString().split("T")[0];

    await api.post("/progress", {
      date: today,
      weight: form.weight,
      calories: form.calories,
      steps: form.steps
    });

    setForm({ weight: "", calories: "", steps: "" });
    fetchProgress(); // 🔥 auto refresh chart
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <h2>Add Today’s Progress</h2>

          <input
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={e => setForm({ ...form, weight: e.target.value })}
          />
          <input
            placeholder="Calories"
            value={form.calories}
            onChange={e => setForm({ ...form, calories: e.target.value })}
          />
          <input
            placeholder="Steps"
            value={form.steps}
            onChange={e => setForm({ ...form, steps: e.target.value })}
          />

          <button onClick={addProgress}>Save Progress</button>
        </div>

        {data.length > 0 && (
          <div className="card">
            <h2>Weight Progress</h2>
            <LineChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="weight" stroke="#1976d2" strokeWidth={3} />
            </LineChart>
          </div>
        )}
      </div>
    </>
  );
}
