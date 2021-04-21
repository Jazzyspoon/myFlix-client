import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setMovies } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
//import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Col,
  Row,
} from "react-bootstrap";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      user: null,
    };
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
  getMovies(token) {
    axios
      .get("https://movieflixappjp.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <div className="main-view ">
          <Navbar expand="sm" bg="black" variant="dark" fixed="top">
            <Navbar.Brand href="/">
              <h1 className="MFLX">MovieFlix</h1>
            </Navbar.Brand>
            <Nav className="mr-auto MFLXsm">
              <Nav.Item>
                <Link to="/">
                  <Button variant="link" className="colorcrew">
                    {" "}
                    <h5>Movies</h5>{" "}
                  </Button>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={`/users/${user}`}>
                  {" "}
                  <Button variant="link" className="colorcrew">
                    <h5>Profile</h5>
                  </Button>
                </Link>
              </Nav.Item>
              <Link to="/">
                <Button
                  variant="link"
                  onClick={() => this.onLogOut()}
                  className="colorcrew"
                >
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
              <Button className="colorcrew" variant="outline-info">
                <h6>Search</h6>
              </Button>
            </Form>
          </Navbar>

          {/* ----------------------------VIEWS---------------------- */}
          <Row xl>
            {/* LOGIN VIEW */}
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
            />

            {/* REGISTER VIEW */}
            <Route path="/register" render={() => <RegisterView />} />

            {/* MOVIE CARD VIEW */}
            {/* <Route
            exact
            path="/"
            render={() =>
              movies.map((m) => <MovieCard key={m._id} movie={m} />)
            }
          /> */}

            {/* MOVIE VIEW */}
            <Route
              path="/movies/:movieId"
              render={({ match }) => (
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                />
              )}
            />

            {/* GENRE VIEW */}
            <Route
              path="/genres/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <GenreView
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    movies={movies}
                  />
                );
              }}
            />

            {/* DIRECTOR VIEW */}
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

            {/* PROFILE VIEW */}
            <Route
              exact
              path={`/users/:username`}
              render={({ history }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                  );
                if (movies.length === 0) return;
                return <ProfileView history={history} movies={movies} />;
              }}
            />
          </Row>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

// #8
export default connect(mapStateToProps, { setMovies })(MainView);
