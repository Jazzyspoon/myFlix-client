import React from "react";
import PropTypes from "prop-types";
import { Col, Button, Image, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { movies: movie, genre } = this.props;

    if (!genre) return null;
    // if (this.state.initialState === "") return;
    return (
      <Row>
        <div className="movie-view">
          <div className="card mb-3 cardbody" style={{ width: "750px" }}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <Image src={genre.Genre.ImagePath} className="image" fluid />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Text as="h1">{genre.Genre.Name}</Card.Text>
                  <Card.Text>Description: {genre.Genre.Description}</Card.Text>
                  <Card.Text>
                    Examples of {genre.Genre.Name} movies: {genre.Genre.Ex}
                  </Card.Text>
                  <Link to="/">
                    <Button variant="danger"> Back to Movies </Button>
                  </Link>
                </Card.Body>
              </div>
            </div>
          </div>
        </div>
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
  }),
};
