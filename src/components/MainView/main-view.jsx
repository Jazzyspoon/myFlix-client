import React from "react";
import axios from "axios";
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movie: null,
      selectedMovie: null,
      user: null,
      register: null,
    };
  }
  componentDidMount() {
    axios
      .get("https://movieflixappjp.herokuapp.com/movies")
      .then((response) => {
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

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user,
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
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    /* Register */
    if (!register)
      return (
        <RegisterView onRegister={(register) => this.onRegister(register)} />
      );

    return (
      <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              this.setState({ selectedMovie: newSelectedMovie });
            }}
          />
        ))}
      </div>
    );
  }
}
