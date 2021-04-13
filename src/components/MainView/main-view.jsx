import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../registration-view/registration-view";

import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],

      user: null,
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
  onLoggedOut() {
    console.log("logged out");
    this.setState({
      user: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  render() {
    const { movies, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
    if (!movies) return <div className="main-view" />;
    /* Register */
    if (!register)
      return (
        <RegisterView onRegister={(register) => this.onRegister(register)} />
      );

    return (
      <Router>
        <div className="main-view">
          <Navbar expand="sm" bg="black" variant="dark" fixed="top">
            <Navbar.Brand href="/">
              <h1 className="MFLX">MovieFlix</h1>
            </Navbar.Brand>
            <Nav className="mr-auto MFLXsm">
              <Link style="NavLink" to="/movies">
                <h6>Home</h6>
              </Link>
              <Link to="/profile">
                <h6>Profile</h6>
              </Link>
              <Link to="/">
                <h6>Log Out</h6>
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
          <Route path="/register" render={() => <RegistrationView />} />
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
            exact
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
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
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              );
            }}
          />
        </div>
      </Router>
    );
  }
}
