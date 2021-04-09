import React, { useState } from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

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
    <div>
      <Navbar expand="sm" bg="black" variant="dark" fixed="top">
        <Navbar.Brand href="/">
          <h1 className="MFLX">MovieFlix</h1>
        </Navbar.Brand>
        <Nav className="mr-auto MFLXsm">
          <Nav.Link href="/">
            <h6>Home</h6>
          </Nav.Link>
          <Nav.Link href="/movies">
            <h6>Movies</h6>
          </Nav.Link>
          <Nav.Link href="#Featured">
            <h6>Featured</h6>
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">
            <h6>Search</h6>
          </Button>
        </Form>
      </Navbar>
      <h1 className="title-top">Welcome to MovieFlix!</h1>
      <p>Please create an account to continue.</p>
      <Form>
        <Form.Group controlId="formUsername">
          Enter Username:
          <Form.Control
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          Create Password:
          <Form.Control
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          Email:
          <Form.Control
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          Birthdate:
          <Form.Control
            type="birthday"
            value={Birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
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
