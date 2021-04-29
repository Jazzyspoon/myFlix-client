import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setUser } from "../../actions/actions";
import { Navbar, Nav, Form, Button, Col } from "react-bootstrap";
import axios from "axios";

import "./registration-view.scss";

function RegisterView(props) {
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
        alert(
          "The information entered does not meet minimum requirements.  Please re-enter your information and resubmit"
        );
      });
  };
  return (
    <Col>
      <Navbar expand="sm" bg="black" variant="dark" fixed="top">
        <Navbar.Brand href="/">
          <h1 className="MFLX">MovieFlix</h1>
        </Navbar.Brand>
        <Nav className="mr-auto MFLXsm"></Nav>
      </Navbar>

      <h1 className="title-top">Welcome to MovieFlix!</h1>
      <p>Please create an account to continue.</p>
      <Form>
        <Form.Group controlId="formUsername">
          Enter Username: 25 characters max/A-z, 0-9 only
          <Form.Control
            placeholder="Username:"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength="25"
            pattern="[a-zA-Z0-9]+"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          Create Password: 25 characters maxi/A-z, 0-9 only
          <Form.Control
            placeholder="Password: "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength="25"
            pattern="[a-zA-Z0-9 ]+"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          Email:
          <Form.Control
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          Birthdate:
          <Form.Control
            placeholder="Birthday: MM/DD/YYYY"
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
        <br></br>
        <span>Already a member?</span>
        <br></br>
        <Button href="/" variant="primary" type="submit">
          Log In
        </Button>
      </div>
    </Col>
  );
}

export default connect(null, { setUser })(RegisterView);
RegisterView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
  onRegister: PropTypes.func,
};
