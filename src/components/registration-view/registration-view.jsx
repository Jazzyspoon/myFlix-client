import React, { useState } from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./registration-view.scss";

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // entire URL is in package.json under 'proxy' to get past CORS
    axios
      .post(`https://movieflixappjp.herokuapp.com/users`, {
        Username: username,
        Email: email,
        Password: password,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e.response);
      });
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
      <p>Please create an account to continue.</p>
      <Form>
        <Form.Group controlId="formUsername">
          Enter Username:
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern="[a-zA-Z0-9]+"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          Create Password:
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            pattern="[a-zA-Z0-9 ]+"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          Email:
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          Birthdate:
          <Form.Control
            type="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit" onClick={handleRegister}>
          Submit
        </Button>
      </Form>
      <div>
        <span>Already a member?</span>
        <br></br>
        <Link to="/">
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Link>
      </div>
    </div>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
  onRegister: PropTypes.func,
};
