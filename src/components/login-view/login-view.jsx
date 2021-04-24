import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, togglePassword } from "../../actions/actions";
import "./login-view.scss";

const mapStateToProps = (state) => {
  const { user, togglepassword } = state;
  return { user, togglepassword };
};
export function LoginView(props) {
  const { user, togglepassword } = props;
  const [username] = useState("");
  const [password] = useState("");

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
        .post(
          `https://movieflixappjp.herokuapp.com/login`,
          {},
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
          console.error("no such user");
        });
      return true;
    }
  };
  useEffect(() => {
    let usernameInput = document.querySelector("#formUsername");
    let passwordInput = document.querySelector("#formPassword");

    function validateUsername() {
      let value = usernameInput.value;
      let reg = /\w{5,}/;
      if (!value) {
        showErrorMessage(usernameInput, "Username is required.");
        return false;
      }
      if (!reg.test(value)) {
        showErrorMessage(
          usernameInput,
          "Username must contain at least 5 alphanumeric characters."
        );
        return false;
      }
      showErrorMessage(usernameInput, null);
      return true;
    }
    function validatePassword() {
      let value = passwordInput.value;
      if (!value) {
        showErrorMessage(passwordInput, "Please provide your password.");
        return false;
      }
      showErrorMessage(passwordInput, null);
      return true;
    }
    function showErrorMessage(input, message) {
      let container = input.parentElement;
      let error = container.querySelector(".error-message");
      if (error) {
        container.removeChild(error);
      }
      if (message) {
        let error = document.createElement("div");
        error.classList.add("error-message");
        error.innerText = message;
        container.appendChild(error);
      }
    }
    usernameInput.oninput = validateUsername;
    passwordInput.oninput = validatePassword;
  });

  const changeState = () => {
    var oldState = togglepassword.type;
    var isTextOrHide = oldState === "password";
    var newState = isTextOrHide ? "text" : "password";
    var newWord = isTextOrHide ? "Hide" : "Show";
    props.togglePassword({ type: newState, word: newWord });
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
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            required
            onChange={(e) =>
              props.setUser({ ...user, Username: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>

          <Form.Control
            type={togglepassword.type}
            value={password}
            placeholder="Password"
            name="password"
            onChange={(e) =>
              props.setUser({ ...user, Password: e.target.value })
            }
          />
          <span className="password-trigger" onClick={changeState}>
            {togglepassword.word}
          </span>
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

export default connect(mapStateToProps, { setUser, togglePassword })(LoginView);

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
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
