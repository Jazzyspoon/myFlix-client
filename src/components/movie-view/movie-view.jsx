import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
    console.log("f");
  }

  goBack() {
    window.open("/", "_self");
  }
  render() {
    const { movieData: movie, onClick } = this.props;
    if (!movie) return null;

    // if (this.state.initialState === "") return;

    return (
      <div className="movie-view">
        <Row>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" className="movie-poster">
              <img src={movie.ImagePath} alt={movie.Title} />
            </Card.Img>
            <Card.Body>
              <Card.Title className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </Card.Title>
              <Card.Text className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </Card.Text>
              <Card.Text className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </Card.Text>
              <Card.Text className="movie-director">
                <span className="label">Director: </span>
                <span className="value">{movie.Director.Name}</span>
              </Card.Text>
              <Button
                variant="success"
                onClick={() => {
                  onClick();
                }}
              >
                Back to Movie List
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
