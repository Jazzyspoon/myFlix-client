import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Jumbotron, Image, Card } from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  onbackClick() {
    window.open("/movies", "_self");
  }
  render() {
    const { movie: movieData } = this.props;
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
            <Card.Text>
              <h4>"{movieData.Description}"</h4>
            </Card.Text>

            <Card.Text>
              <h5>Starring: {movieData.Actors}</h5>
            </Card.Text>

            <Card.Text>
              Director: {movieData.Director.Name} <a href="#">(Bio)</a>
            </Card.Text>

            {/* <Card.Text>Director Bio: {movieData.Director.Bio}</Card.Text> */}

            <Card.Text>
              Genre: {movieData.Genre.Name}{" "}
              <a href="#"> What is {movieData.Genre.Name}? </a>
            </Card.Text>

            {/* <Card.Text>
                What is '{movieData.Genre.Name}'?: {movieData.Genre.Description}
              </Card.Text> */}

            <Button onClick={() => this.onbackClick(null)} variant="danger">
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
