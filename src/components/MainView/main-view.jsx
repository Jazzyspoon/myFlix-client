import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../registration-view/registration-view";

import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: "",
      register: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://movieflixappjp.herokuapp.com/movies", {
        headers: { Authorization: "Bearer ${token}" },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }
  //log out
  onLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    alert("You are now logged out");
    window.open("/", "_self");
  }
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  render() {
    const { movies, user, selectedMovie, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Navbar expand="sm" bg="black" variant="dark" fixed="top">
            <Navbar.Brand href="/">
              <h1 className="MFLX">MovieFlix</h1>
            </Navbar.Brand>
            <Nav className="mr-auto MFLXsm">
              <Nav.Item>
                <Link to="/">
                  <Button variant="link">
                    {" "}
                    <h5>Movies</h5>{" "}
                  </Button>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/users/:username">
                  <Button variant="link">
                    <h5>Profile</h5>
                  </Button>
                </Link>
              </Nav.Item>
              <Link to="/">
                <Button variant="link" onClick={() => this.onLogOut()}>
                  <h5>Log Out</h5>
                </Button>
              </Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-1"
              />
              <Button variant="outline-info">
                <h6>Search</h6>
              </Button>
            </Form>
          </Navbar>
          {/* login view */}
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              return movies.map((m) => <MovieCard key={m._id} movie={m} />);
            }}
          />
          {/* register view */}
          <Route path="/register" render={() => <RegisterView />} />
          {/* movie card view */}
          <Route
            exact
            path="/"
            render={() =>
              movies.map((m) => <MovieCard key={m._id} movie={m} />)
            }
          />
          {/* movie view */}
          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />
          {/* genre view */}
          <Route
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={movies.find((m) => m.Genre.Name === match.params.name)}
                  movies={movies}
                />
              );
            }}
          />

          {/* director view */}
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={movies.find(
                    (m) => m.Director.Name === match.params.name
                  )}
                  movies={movies}
                />
              );
            }}
          />
          <Route
            exact
            path="/users/:username"
            render={({ history }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                );
              if (movies.length === 0) return;
              return <ProfileView history={history} movies={movies} />;
            }}
          />
        </div>
      </Router>
    );
  }
}
