import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { Button, Card, CardGroup, Container, Form } from "react-bootstrap";

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
                <Button>Delete Account</Button>
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
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="password-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.password}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="email-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={this.email}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicBirthday">
                  <Form.Label className="birthday-label">Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Birthday"
                    name="birthday"
                    value={this.birthday}
                  />
                </Form.Group>

                <Button className="button-update">Update</Button>
              </Card.Body>
            </Card>
            <Card className="favorites-card">
              <Card.Body>
                <Card.Text as="h1">Favorite Movies</Card.Text>
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
