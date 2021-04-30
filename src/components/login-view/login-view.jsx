import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../actions/actions";
import "./login-view.scss";

function LoginView(props) {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://movieflixappjp.herokuapp.com/login`, {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.setUser(data);
      })
      .catch((e) => {
        alert("no such user.  Please try again or register an account");
      });
  };

  useEffect(() => {
    if (password === "" || password.length >= 5) {
      setPasswordError("");
    } else if (password.length < 5) {
      setPasswordError("Password must be longer than 4 characters");
    }
  }, [password]);

  useEffect(() => {
    if (username === "" || username.length >= 5) {
      setUsernameError("");
    } else if (username.length < 5) {
      setUsernameError("Username must be longer than 4 characters");
    }
  }, [username]);

  return (
    <div>
      <Navbar expand="sm" bg="black" variant="dark" fixed="top">
        <Navbar.Brand href="/">
          <h1 className="MFLX">MovieFlix</h1>
        </Navbar.Brand>
        <Nav className="mr-auto MFLXsm"></Nav>
      </Navbar>

      <h1 className="title-top">Welcome to MovieFlix!</h1>
      <p>Please login to continue.</p>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            maxLength="25"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="form-error">{usernameError}</p>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>

          <Form.Control
            type={isPasswordVisible ? "text" : "password"}
            maxLength="25"
            value={password}
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="password-trigger"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? "Hide Password" : "Show Password"}
          </span>
          <p className="form-error">{passwordError}</p>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Log In
        </Button>
      </Form>
      <br></br>
      <div>
        <br></br>
        <span>Not a member? Sign up for free!</span>
        <br></br>

        <Link to="/register">
          <Button variant="success" type="submit">
            Register An Account
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default connect(null, { setUser })(LoginView);

LoginView.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
  }),
  togglepassword: PropTypes.shape({
    type: PropTypes.string,
    word: PropTypes.string,
  }),
  togglePassword: PropTypes.func,
};
