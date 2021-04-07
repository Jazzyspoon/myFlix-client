import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  goBack() {
    window.open("/", "_self");
  }
  render() {
    const { movie, onClick } = this.props;
    if (!movie) return null;

    // if (this.state.initialState === '') return ;

    return (
      <div className="movie-view">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" className="movie-poster">
            <img src={movieData.ImagePath} alt={movieData.Title} />
          </Card.Img>
          <Card.Body>
            <Card.Title className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movieData.Title}</span>
            </Card.Title>
            <Card.Text className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movieData.Description}</span>
            </Card.Text>
            <Card.Text className="movie-genre">
              <span className="label">Genre: </span>
              <span className="value">{movieData.Genre.Name}</span>
            </Card.Text>
            <Card.Text className="movie-director">
              <span className="label">Director: </span>
              <span className="value">{movieData.Director.Name}</span>
            </Card.Text>
            <Button
              variant="success"
              onClick={() => {
                onBackClick();
              }}
            >
              Back to Movie List
            </Button>
          </Card.Body>
        </Card>
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
  onClick: PropTypes.func.isRequired,
};
