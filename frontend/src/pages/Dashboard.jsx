import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../pages/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    api.get("/users/me").then(res => setUser(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Welcome {user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="grid">
          <div className="card">
            <h3>Profile</h3>
            <p>View and update your personal details</p>
            <a href="/profile">
              <button>Go</button>
            </a>
          </div>

          <div className="card">
            <h3>Workouts</h3>
            <p>Explore easy workouts for daily fitness</p>
            <a href="/workouts">
              <button>Go</button>
            </a>
          </div>

          <div className="card">
            <h3>Diet</h3>
            <p>Healthy diet plans with calorie info</p>
            <a href="/diet">
              <button>Go</button>
            </a>
          </div>

          <div className="card">
            <h3>Progress</h3>
            <p>Track your weight and fitness progress</p>
            <a href="/progress">
              <button>Go</button>
            </a>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            style={{ background: "#d32f2f" }}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
