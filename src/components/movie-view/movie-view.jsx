import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Image, Card } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie: movieData } = this.props;
    if (!movieData) return null;
    // if (this.state.initialState === "") return;
    return (
      <Router>
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
                <Link to={`/directors/${movieData.Director.Name}`}>
                  <Button size="sm" variant="dark">
                    (Bio)
                  </Button>
                </Link>
              </Card.Text>

              <Card.Text>
                Genre: {movieData.Genre.Name}{" "}
                <Link to={`/genres/${movieData.Genre.Name}`}>
                  <Button size="sm" variant="dark">
                    (What is {movieData.Genre.Name}?){" "}
                  </Button>
                </Link>
              </Card.Text>
              <Link to={`/users/${users.Favorites}`}>
                <Button variant="success">Add to Favorites</Button>
              </Link>
              <br></br>
              <Link to={`/`}>
                <Button variant="danger" className="favbutton">
                  Back to Movies List
                </Button>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Router>
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
