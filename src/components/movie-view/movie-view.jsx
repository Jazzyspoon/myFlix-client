import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Image, Card } from "react-bootstrap";

import "./movie-view.scss";

export class MovieView extends React.Component {
  onbackClick() {
    window.open("/movies", "_self");
  }
  render() {
    const { movie: movieData, director } = this.props;
    if (!movieData) return null;
    // if (this.state.initialState === "") return;
    return (
      <Row className="movie-view">
        <Col>
          <Image src={movieData.ImagePath} className="image" fluid />
        </Col>
        <Col className="cardbody">
          <Card.Header>
            <h1>{movieData.Title}</h1>
            <h6>(Rating: {movieData.Imdb})</h6>
          </Card.Header>
          <Card.Body>
            <h4>"{movieData.Description}"</h4>

            <h5>Starring: {movieData.Actors}</h5>

            <Card.Text>
              Director: {movieData.Director.Name}{" "}
              <Button variant="link"> Bio</Button>
            </Card.Text>

            <Card.Text>
              Genre: {movieData.Genre.Name}{" "}
              <Button variant="link">What is {movieData.Genre.Name}? </Button>
            </Card.Text>

            <Button onClick={() => this.onbackClick(null)} variant="success">
              Add to Favorites
            </Button>
            <br></br>
            <Button
              onClick={() => this.onbackClick(null)}
              variant="danger"
              className="favbutton"
            >
              Back to Movies List
            </Button>
          </Card.Body>
        </Col>
      </Row>
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
  onClick: PropTypes.func,
};
