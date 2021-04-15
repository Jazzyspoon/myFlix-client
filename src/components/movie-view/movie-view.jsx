import React from "react";
import PropTypes from "prop-types";
import { Col, Button, Image, Card } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { FavButton } from "../fav-button/fav-button";
import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie } = this.props;
    if (!movie) return null;
    // if (this.state.initialState === "") return;

    return (
      <Col className="movie-view">
        <Card className="cardbody">
          <Card.Body>
            <Image src={movie.ImagePath} className="image" fluid />
            <Card.Text as="h1">{movie.Title}</Card.Text>
            <Card.Text as="h5">(Rating: {movie.Imdb})</Card.Text>
            <Card.Text as="h4">"{movie.Description}"</Card.Text>

            <Card.Text as="h5">
              Starring:<br></br>
              {movie.Actors}{" "}
            </Card.Text>

            <Card.Text as="h5">
              Director:<br></br>
              {movie.Director.Name}{" "}
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button size="sm" variant="dark">
                  (Bio)
                </Button>
              </Link>{" "}
            </Card.Text>

            <Card.Text as="h5">
              Genre:<br></br>
              {movie.Genre.Name}{" "}
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button size="sm" variant="dark">
                  (What is {movie.Genre.Name}?){" "}
                </Button>
              </Link>
            </Card.Text>
            <Link to={`/`}>
              <Button variant="success">Add to Favorites</Button>
            </Link>
            <br></br>
            <FavButton>Add to Favorites</FavButton>
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
