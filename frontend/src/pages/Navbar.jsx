export default function Navbar() {
  return (
    <div className="navbar">
      <a href="/dashboard">Dashboard</a>
      <a href="/profile">Profile</a>
      <a href="/workouts">Workouts</a>
      <a href="/diet">Diet</a>
      <a href="/progress">Progress</a>
      <a href="/" onClick={() => localStorage.removeItem("token")}>
        Logout
      </a>
    </div>
  );
}
