import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Row } from "react-bootstrap";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movieData: movie, onClick } = this.props;

    return (
      <div className="card-rows">
        <Row xl>
          <Card className="movie-card" style={{ width: "20rem" }}>
            <Card.Img className="image" variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>

              <Button onClick={() => onClick(movie)} variant="danger">
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,

  onClick: PropTypes.func.isRequired,
};
