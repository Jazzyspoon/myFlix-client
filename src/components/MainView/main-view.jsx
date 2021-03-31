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
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
        },
        {
          _id: "604f9e3505951614efe12f3a",
          Title: "Alien",
          Description:
            "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
          Genre: "sci-fi",
          Director: "Ridley Scott",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BMmQ2MmU3NzktZjAxOC00ZDZhLTk4YzEtMDMyMzcxY2IwMDAyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
        },
        {
          _id: "604f9e5805951614efe12f3b",
          Title: "The Chronicles Of Riddick",
          Description:
            "The wanted criminal Richard Bruno Riddick (Vin Diesel) arrives on a planet called Helion Prime and finds himself up against an invading empire called the Necromongers, an army that plans to convert or kill all humans in the universe.",
          Genre: "sci-fi",
          Director: "David Twohy",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BNzBjNmJkYjUtMTFjMC00ZWI5LWEyM2YtNzczOTczMmM1ODY5XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
        },
        {
          _id: "604f9e6505951614efe12f3c",
          Title: "The Avengers",
          Description:
            "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
          Genre: "action",
          Director: "Joss Whedon",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
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
