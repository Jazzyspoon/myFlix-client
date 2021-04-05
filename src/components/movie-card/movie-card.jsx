import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        {movieData.Title}
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({ Name: PropTypes.string.isRequired }).isRequired,
    Genre: PropTypes.shape({ Name: PropTypes.string.isRequired }).isRequired,
    }).isRequired,

  onClick: PropTypes.func.isRequired,
};
