import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { Button, Card, CardGroup, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";
export class ProfileView extends React.Component {
  constructor(props) {
    super();

    this.username = undefined;
    this.password = undefined;
    this.email = undefined;
    this.birthday = undefined;

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      Favoritemovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios
      .get(`https://movieflixappjp.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          Favoritemovies: response.data.Favoritemovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate = (e) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://movieflixappjp.herokuapp.com/users/${username}`,
        {
          Username: this.username,
          Password: this.password,
          Email: this.email,
          Birthday: this.birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        window.open("/users", "_self");
        alert("Update Successful.");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleDeregistration = (e) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://movieflixappjp.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },

        Username: username,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("error deregistering user");
      });

    this.setState({
      user: null,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  removeItem(movie) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://movieflixappjp.herokuapp.com/users/${username}/Favoritemovies/${movie}`,
        {
          headers: { Authorization: `Bearer ${token}` },

          Favoritemovies: this.Favoritemovies,
        }
      )
      .then((response) => {
        this.setState({
          Favoritemovies: response.data.Favoritemovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    alert("movie removed.");
  }

  setUsername(input) {
    this.username = input;
  }
  setPassword(input) {
    this.password = input;
  }
  setEmail(input) {
    this.email = input;
  }
  setBirthday(input) {
    this.birthday = input;
  }

  render() {
    const { movies } = this.props;

    const Username = this.state.Username,
      Email = this.state.Email,
      Birthday = this.state.Birthday,
      Favoritemovies = this.state.Favoritemovies;

    return (
      <div className="profile-view title-top regi-view">
        <Container className="profile-view-container">
          <CardGroup>
            <Card className="profile-card cardbody">
              <Card.Body>
                <Card.Text as="h1">Profile</Card.Text>
                <Card.Text className="text-card">
                  Username: {Username}
                </Card.Text>
                <Card.Text className="text-card">Password: *******</Card.Text>
                <Card.Text className="text-card">Email: {Email}</Card.Text>
                <Card.Text className="text-card">
                  Birthday: {Birthday}
                </Card.Text>
                <Button
                  className="button-delete"
                  variant="danger"
                  onClick={() => this.handleDeregistration()}
                >
                  Delete Account
                </Button>
              </Card.Body>
            </Card>
            <Card className="edit-profile-card cardbody">
              <Card.Body>
                <Card.Text as="h1">Edit Profile</Card.Text>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="username-label">Username</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={this.username}
                    onChange={(e) => this.setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="password-label">Password</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.password}
                    onChange={(e) => this.setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="email-label">Email address</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={this.email}
                    onChange={(e) => this.setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicBirthday">
                  <Form.Label className="birthday-label">Birthday</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="date"
                    placeholder="Birthday"
                    name="birthday"
                    value={this.birthday}
                    onChange={(e) => this.setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Button
                  className="button-update"
                  variant="success"
                  onClick={() => this.handleUpdate()}
                >
                  Update
                </Button>
              </Card.Body>
            </Card>
            <Card className="favorites-card cardbody">
              <Card.Body>
                <Card.Text as="h1">Favorite Movies</Card.Text>

                <div>
                  <ul>
                    {Favoritemovies &&
                      movies.map((movie) => {
                        if (
                          movie._id ===
                          Favoritemovies.find(
                            (favMovie) => favMovie === movie._id
                          )
                        ) {
                          return (
                            <li key={movie._id}>
                              {movie.Title}
                              <Button
                                size="sm"
                                className="favbutt"
                                variant="link"
                                size="sm"
                                onClick={() => this.removeItem(movie._id)}
                              >
                                -Unfavorite
                              </Button>
                            </li>
                          );
                        }
                      })}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Container>
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.date,
    Favoritemovies: PropTypes.array,
  }),
};
