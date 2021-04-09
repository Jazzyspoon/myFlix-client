import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  onbackClick() {
    window.open("/", "_self");
  }

  render() {
    const { movieData: movie, onbackClick } = this.props;
    if (!movie) return null;

    // if (this.state.initialState === "") return;

    return (
      <div className="movie-view">
        <Row>
          <Card>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button onClick={() => this.onbackClick(null)} variant="link">
                Back
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({ Name: PropTypes.string.isRequired }).isRequired,
    Genre: PropTypes.shape({ Name: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};
