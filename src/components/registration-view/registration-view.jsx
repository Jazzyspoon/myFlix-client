import React, { useState } from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister("test");
  };

  return (
    <form>
      <h1>Welcome to movieFlix!</h1>
      <p>Please create an account to continue.</p>
      <label>
        Enter Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Create Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Birthdate:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Birthdate:
        <input
          type="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>

      <button onClick={handleSubmit} variant="primary" type="submit">
        Submit
      </button>
    </form>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegister: PropTypes.func.isRequired,
};
