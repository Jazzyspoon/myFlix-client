import React from "react";
import PropTypes from "prop-types";
import { Col, Button, Image, Card } from "react-bootstrap";
import { BrowserRouter as Link, Router } from "react-router-dom";
import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;
    // if (this.state.initialState === "") return;
    return (
      <div className="movie-view">
        <Col>
          <Image src={genre.Genre.ImagePath} className="image" fluid />
        </Col>
        <Card style={{ width: "25rem" }} className="cardbody">
          <Card.Header>
            <h1>Genre: {genre.Genre.Name}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>Description: {genre.Genre.Description}</Card.Text>
            <Card.Text>
              Examples of {genre.Genre.Name} Movies: {genre.Genre.Ex}
            </Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="danger">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
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
};
