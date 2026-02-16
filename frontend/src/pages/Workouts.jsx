import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../pages/Navbar";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    api.get("/workouts")
      .then(res => setWorkouts(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Workouts</h2>
        <p>Easy workouts designed for beginners</p>

        <div className="grid">
          {workouts.map(w => (
            <div className="card" key={w.id}>
              <h3>{w.title}</h3>
              <p>{w.description}</p>

              <span
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  background:
                    w.difficulty.toLowerCase() === "easy"
                      ? "#4caf50"
                      : w.difficulty.toLowerCase() === "medium"
                      ? "#ff9800"
                      : "#f44336",
                  color: "white",
                  fontSize: "14px"
                }}
              >
                {w.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
