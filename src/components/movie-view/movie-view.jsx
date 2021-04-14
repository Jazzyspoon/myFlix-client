import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Image, Card } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie } = this.props;
    if (!movie) return null;
    // if (this.state.initialState === "") return;
    return (
      <Col className="movie-view">
        <Card style={{ width: "40rem" }}>
          <Card.Header>
            <Image src={movie.ImagePath} className="image" fluid />
          </Card.Header>
          <Card.Body>
            <h1>{movie.Title}</h1>
            <h5>(Rating: {movie.Imdb})</h5>
            <h4>"{movie.Description}"</h4>

            <h5>
              Starring:
              {movie.Actors}{" "}
            </h5>

            <Card.Text>
              <h5>
                Director:
                {movie.Director.Name}{" "}
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button size="sm" variant="dark">
                    (Bio)
                  </Button>
                </Link>{" "}
              </h5>
            </Card.Text>

            <Card.Text>
              <h5>
                Genre:
                {movie.Genre.Name}{" "}
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button size="sm" variant="dark">
                    (What is {movie.Genre.Name}?){" "}
                  </Button>
                </Link>
              </h5>
            </Card.Text>
            <Link to={`/users`}>
              <Button variant="success">Add to Favorites</Button>
            </Link>
            <br></br>
            <Link to={`/`}>
              <Button variant="danger" className="favbutton">
                Back to Movies List
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Actors: PropTypes.string.isRequired,
    Imdb: PropTypes.string.isRequired,
  }).isRequired,
};
