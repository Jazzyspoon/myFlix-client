import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUser, togglePassword } from "../../actions/actions";
import "./registration-view.scss";

const mapStateToProps = (state) => {
  const { user, togglepassword } = state;
  return { user, togglepassword };
};

function RegisterView(props) {
  const { user: username, togglepassword } = props;

  const handleRegister = (e) => {
    e.preventDefault();
    let error = document.querySelector(".error-message");
    if (error) {
      let container = document.querySelector(".btn-register").parentElement;
      let note = document.createElement("div");
      note.classList.add("note-message");
      note.innerText = `Registration not possible due to input errors. `;
      container.appendChild(note);
      setTimeout(function () {
        container.removeChild(note);
      }, 4000);
      return false;
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
    let usernameInput = document.querySelector("#formUsername");
    let passwordInput = document.querySelector("#formPassword");
    let emailInput = document.querySelector("#formEmail");
    let birthdayInput = document.querySelector("#formBirthday");
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
    function validateEmail() {
      let value = emailInput.value;
      let reg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!value) {
        showErrorMessage(emailInput, "Email is required.");
        return false;
      }
      if (!reg.test(value)) {
        showErrorMessage(emailInput, "Invalid mail pattern.");
        return false;
      }
      showErrorMessage(emailInput, null);
      return true;
    }
    function validateBirthday() {
      let value = birthdayInput.value;

      if (!value instanceof Date) {
        showErrorMessage(birthdayInput, "Please enter a valid date.");
        return false;
      }
      showErrorMessage(birthdayInput, null);
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
    emailInput.oninput = validateEmail;
    birthdayInput.onchange = validateBirthday;
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
      <p>Please create an account to continue.</p>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>

          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            className="form-control-register"
            value={username}
            onChange={(e) =>
              props.setUser({ ...user, Username: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password*</Form.Label>

          <Form.Control
            type={togglepassword.type}
            value={password}
            placeholder="Password"
            name="password"
            className="form-control-register"
            onChange={(e) =>
              props.setUser({ ...user, Password: e.target.value })
            }
          />
          <span className="password-trigger" onClick={changeState}>
            {togglePassword.word}
          </span>
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

export default connect(mapStateToProps, { setUser, togglePassword })(
  RegisterView
);

RegisterView.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.Date,
  }),
  togglepassword: PropTypes.shape({
    type: PropTypes.string,
    word: PropTypes.string,
  }),
  togglePassword: PropTypes.func.isRequired,
};
