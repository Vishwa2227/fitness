import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../pages/Navbar";

export default function Profile() {
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    goal: ""
  });

  // Load existing profile (if already saved)
  useEffect(() => {
    api.get("/profile/me")
      .then(res => {
        if (res.data) {
          setForm(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const saveProfile = async () => {
    try {
      await api.post("/profile/", form);
      alert("Profile updated successfully ✅");
    } catch (err) {
      alert("Error saving profile ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>My Profile</h2>

          <label>Age</label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />

          <label>Height (cm)</label>
          <input
            type="number"
            value={form.height}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
          />

          <label>Weight (kg)</label>
          <input
            type="number"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />

          <label>Fitness Goal</label>
          <input
            type="text"
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
          />

          <button onClick={saveProfile} style={{ marginTop: "15px" }}>
            Save Profile
          </button>
        </div>
      </div>
    </>
  );
}
