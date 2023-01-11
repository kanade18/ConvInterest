import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if(username) {
      onLogin(username);
    }
  }

  return (
      <div className="login">
        <form className="login__form" action="#/login" onSubmit={onSubmit}>
          <label>
            <span>Username:</span>
            <input className="login__username" value={username} onChange={onChange} required/>
          </label>
          <button className="login__button" type="submit" disabled={username === "" || username.trim() === ""}>Login</button>
        </form>
      </div>
  );

}

export default Login;
