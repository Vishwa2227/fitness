import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../pages/Navbar";

export default function Diet() {
  const [diet, setDiet] = useState([]);

  useEffect(() => {
    api.get("/diet")
      .then(res => setDiet(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Diet Plan</h2>
        <p>Simple and healthy diet recommendations</p>

        <div className="grid">
          {diet.map(d => (
            <div className="card" key={d.id}>
              <h3>{d.meal_type}</h3>

              <p style={{ margin: "10px 0" }}>
                {d.description}
              </p>

              <span
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  background: "#1976d2",
                  color: "white",
                  fontSize: "14px"
                }}
              >
                {d.calories} kcal
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
