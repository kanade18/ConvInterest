function ActiveUsers({
  active_users,
}) {
  const message = `There are ${active_users} active users`;
  return (
    <div className="active__users__container">
      <h3>Active Users</h3>
      <label>{message}</label>
    </div>
  );
}

export default ActiveUsers;
