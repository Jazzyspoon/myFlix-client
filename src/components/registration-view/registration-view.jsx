import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../../actions/actions";
import "./registration-view.scss";

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

function RegisterView(props) {
  const { user } = props;
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    let error = document.querySelector(".error-message");
    if (error) {
    } else {
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
      return true;
    }
  };
  useEffect(() => {
    if (password === "" || password.length >= 6) {
      setPasswordError("");
    } else if (password.length < 6) {
      setPasswordError("Password must be longer than 5 characters");
    }
  }, [password]);

  useEffect(() => {
    if (username === "" || username.length >= 6) {
      setUsernameError("");
    } else if (username.length < 6) {
      setUsernameError("Username must be longer than 5 characters");
    }
  }, [username]);

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
          <Form.Label>Username:</Form.Label>

          <Form.Control
            maxLength="10"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            className="form-control-register"
            required
            onChange={(e) =>
              props.setUser({ ...user, Username: e.target.value })
            }
          />
          <p className="form-error">{usernameError}</p>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password*</Form.Label>

          <Form.Control
            type={isPasswordVisible ? "text" : "password"}
            maxLength="10"
            value={password}
            placeholder="Password"
            name="password"
            className="form-control-register"
            onChange={(e) =>
              props.setUser({ ...user, Password: e.target.value })
            }
          />
          <span
            className="password-trigger"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </span>
          <p className="form-error">{passwordError}</p>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email*</Form.Label>

          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            name="email"
            className="form-control-register"
            onChange={(e) => props.setUser({ ...user, Email: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>

          <Form.Control
            type="date"
            value={birthday}
            placeholder="Birthday"
            name="birthday"
            className="form-control-register"
            onChange={(e) =>
              props.setUser({ ...user, Birthday: e.target.value })
            }
          />
        </Form.Group>

        <Button variant="success" type="submit" onClick={handleRegister}>
          Submit
        </Button>
      </Form>
      <div>
        <span>Already a member?</span>
        <br></br>
        <Button href="/" variant="primary" type="submit">
          Log In
        </Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { setUser })(RegisterView);

RegisterView.propTypes = {
  setUser: PropTypes.func,
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.Date,
  }),
  // togglepassword: PropTypes.shape({
  //   type: PropTypes.string,
  //   word: PropTypes.string,
  // }),
  // togglePassword: PropTypes.func.isRequired,
};
