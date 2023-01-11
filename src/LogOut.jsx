function LogOut({ onLogout }) {
  return (
    <div className="logout">
      <button onClick={onLogout} className="controls__logout">Logout</button>
    </div>
  );
}

export default LogOut;
