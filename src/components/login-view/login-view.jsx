import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";

function LoginView(props) {
  const { user, togglepassword } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = document.querySelector(".error-message");
    if (error) {
      let container = document.querySelector(".btn-login").parentElement;
      let note = document.createElement("div");
      note.classList.add("note-message");
      note.innerText = `Form error.`;
      container.appendChild(note);
      setTimeout(function () {
        container.removeChild(note);
      }, 4000);
      return false;
    } else {
      axios
        .post("https://movieflixappjp.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log(e);
          console.error("no such user");
        });
      return true;
    }
  };

  return (
    <div>
      <Navbar expand="sm" bg="black" variant="dark" fixed="top">
        <Navbar.Brand>
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
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>

          <Form.Control
            type={togglepassword}
            value={password}
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Log In
        </Button>
      </Form>
      <br></br>
      <div>
        <span>Not a member?</span>
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

export default LoginView;

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,

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
