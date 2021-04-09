import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../registration-view/registration-view";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { DirectorView } from "../director-view/director-view";
// import { Genreview } from "../genre-view/genre-view";

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
      selectedMovie: null,
      user: null,
      selectedDirector: null,
    };
  }
  componentDidMount() {
    axios
      .get("https://movieflixappjp.herokuapp.com/movies")
      .then((response) => {
        console.log(response.data);
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  /* When director 'bio' button is clicked, selectedDirector will set on it's initial state*/
  onDirectorClick(director) {
    this.setState({
      selectedDirector: director,
    });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user: user,
    });
  }

  /* */
  onRegister(register) {
    this.setState({
      register,
    });
  }

  /* When back button click selectedMovie will set on it's initial state*/
  setInititalState() {
    this.setState({
      selectedMovie: null,
    });
  }

  render() {
    const {
      movies,
      selectedMovie,
      user,
      register,
      selectedDirector,
    } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    /* Register */
    if (!register)
      return (
        <RegisterView onRegister={(register) => this.onRegister(register)} />
      );

    // Before the movies have been loaded
    // if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
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

        {selectedMovie ? (
          <Row className="justify-content-md-center">
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(movie) => this.onMovieClick(null)}
              />
            </Col>
          </Row>
        ) : selectedDirector ? (
          <Row className="justify-content-md-center">
            <Col md={8}>
              <DirectorView
                director={selectedDirector}
                onBackClick={(movie) => this.onMovieClick(null)}
              />
            </Col>
          </Row>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movieData={movie}
              onClick={(movie) => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}
