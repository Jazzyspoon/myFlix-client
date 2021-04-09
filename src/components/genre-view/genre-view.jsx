import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Image, Card } from "react-bootstrap";
import "./genre-view.scss";

export class GenreView extends React.Component {
  onbackClick() {
    window.open("/movies");
  }
  render() {
    const { movie: movieData } = this.props;
    if (!movieData) return null;
    // if (this.state.initialState === "") return;
    return (
      <Row className="movie-view">
        <Col>
          <Image src={movieData.Genre.ImagePath} className="image" fluid />
        </Col>
        <Col className="cardbody">
          <Card.Header>
            <h1>Genre: {movieData.Genre.Name}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>Description: {movieData.Genre.Description}</Card.Text>
            <Card.Text>
              Examples of {movieData.Genre.Name} Movies: {movieData.Director.Ex}
            </Card.Text>
            <Button onClick={() => this.onbackClick(null)} variant="danger">
              Back to Movies List
            </Button>
          </Card.Body>
        </Col>
      </Row>
    );
  }
}
GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Ex: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};
