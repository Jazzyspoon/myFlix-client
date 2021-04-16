import axios from "axios";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./login-view.scss";
const { check } = require("express-validator");
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post(
        "https://movieflixappjp.herokuapp.com/login",
        [
          check("Username", "Username is required").isLength({ min: 5 }),
          check(
            "Username",
            "Username contains non alphanumeric characters - not allowed."
          ).isAlphanumeric(),
          check("Password", "Password is required").not().isEmpty(),
        ],
        {
          Username: username,
          Password: password,
        }
      )
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

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
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Log In
        </Button>
      </Form>
      <br></br>
      <Router>
        <p>Not a member?</p>
        <Route path="/register" />
        <Link to="/register">
          <Button variant="success" type="submit">
            Register An Account
          </Button>
        </Link>
      </Router>
    </div>
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
