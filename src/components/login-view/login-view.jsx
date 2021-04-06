import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login-view.scss";

export function LoginView(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = () => {
    e.preventDefault();
    console.log(Username, Password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(Username);
  };

  return (
    <div>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func,
};
