import React, { useState } from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";

export function RegisterView(props) {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
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
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Create Password:
        <input
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Birthdate:
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Birthdate:
        <input
          type="birthday"
          value={Birthday}
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
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
  onRegister: PropTypes.func.isRequired,
};
