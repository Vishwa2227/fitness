import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const form = new FormData();
      form.append("username", email);
      form.append("password", password);

      const res = await api.post("/users/login", form);
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/dashboard";
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1976d2, #42a5f5)"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "5px" }}>🏋️ Fitness App</h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Track your workouts, diet & progress every day
        </p>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "15px" }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "10px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          New here?{" "}
          <a href="/register" style={{ color: "#1976d2", fontWeight: "bold" }}>
            Create an account
          </a>
        </p>

        <p style={{ marginTop: "10px", fontSize: "13px", color: "#777" }}>
          💪 Stay fit. Stay strong. Stay consistent.
        </p>
      </div>
    </div>
  );
}
