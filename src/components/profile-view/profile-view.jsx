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
      FavoriteMovies: [],
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
          FavoriteMovies: response.data.FavoriteMovies,
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
        `https://movieflixappjp.herokuapp.com/users/${username}/movies/${movie}`,
        {
          headers: { Authorization: `Bearer ${token}` },

          FavoriteMovies: this.FavoriteMovies,
        }
      )
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    alert("movie successfully removed.");
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
      FavoriteMovies = this.state.FavoriteMovies;

    return (
      <div className="profile-view title-top ">
        <Container className="profile-view-container">
          <CardGroup>
            <Card className="profile-card">
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
                  onClick={() => this.handleDeregistration()}
                >
                  Delete Account
                </Button>
              </Card.Body>
            </Card>
            <Card className="edit-profile-card">
              <Card.Body>
                <Card.Text as="h1">Edit Profile</Card.Text>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="username-label">Username</Form.Label>
                  <Form.Control
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
                    type="date"
                    placeholder="Birthday"
                    name="birthday"
                    value={this.birthday}
                    onChange={(e) => this.setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Button
                  className="button-update"
                  onClick={() => this.handleUpdate()}
                >
                  Update
                </Button>
              </Card.Body>
            </Card>
            <Card className="favorites-card">
              <Card.Body>
                <Card.Text as="h1">Favorite Movies</Card.Text>
                {FavoriteMovies.length === 0 && <div>No favorites</div>}
                <div>
                  <ul>
                    {FavoriteMovies.length > 0 &&
                      movies.map((movie) => {
                        if (
                          movie._id ===
                          FavoriteMovies.find(
                            (favMovie) => favMovie === movie._id
                          )
                        ) {
                          return (
                            <li className="favorite-items" key={movie._id}>
                              {movie.Title}
                              <Button
                                className="button-remove-items"
                                onClick={() => this.removeItem(movie._id)}
                              >
                                Unfavorite
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
    FavoriteMovies: PropTypes.array,
  }),
};
