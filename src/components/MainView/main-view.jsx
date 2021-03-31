import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: "604f9e2305951614efe12f39",
          Title: "Bladerunner",
          Description:
            "A Bladerunner must track down and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.",
          Genre: "sci-fi",
          Director: "Ridley Scott",
          ImagePath: "/src/img/bladerunner.jpg",
        },
        {
          _id: "604f9e3505951614efe12f3a",
          Title: "Alien",
          Description:
            "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
          Genre: "sci-fi",
          Director: "Ridley Scott",
          ImagePath: "/src/img/alien.jpg",
        },
        {
          _id: "604f9e5805951614efe12f3b",
          Title: "The Chronicles Of Riddick",
          Description:
            "The wanted criminal Richard Bruno Riddick (Vin Diesel) arrives on a planet called Helion Prime and finds himself up against an invading empire called the Necromongers, an army that plans to convert or kill all humans in the universe.",
          Genre: "sci-fi",
          Director: "David Twohy",
          ImagePath: "/src/img/riddick.jpg",
        },
        {
          _id: "604f9e6505951614efe12f3c",
          Title: "The Avengers",
          Description:
            "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
          Genre: "action",
          Director: "Joss Whedon",
          ImagePath: "/src/img/avengers.jpg",
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) {
      return (
        <MovieView
          movieData={selectedMovie}
          onBackClick={(newSelectedMovie) => {
            this.setSelectedMovie(newSelectedMovie);
          }}
        />
      );
    }

    if (movies.length === 0) {
      return <div className="main-view">The list is empty</div>;
    }

    return (
      <div className="main-view">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movieData={movie}
            onMovieClick={(movie) => {
              this.setSelectedMovie(movie);
            }}
          />
        ))}
      </div>
    );
  }
}