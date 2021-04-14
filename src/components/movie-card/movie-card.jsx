import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="card-rows">
        <Row xl>
          <Card className="movie-card" style={{ width: "18rem" }}>
            <Card.Img className="image" variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>

              <Link to={`/movies/${movie._id}`}>
                <Button variant="danger">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
