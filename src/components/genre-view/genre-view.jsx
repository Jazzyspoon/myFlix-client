import React from "react";
import PropTypes from "prop-types";
import { Col, Button, Image, Card, Row } from "react-bootstrap";
import { Link, Router } from "react-router-dom";
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
      <div className="movie-view">
        <Row>
          <Col>
            <Card style={{ width: "40rem" }} className="cardbody">
              <Card.Body>
                <Image src={genre.Genre.ImagePath} className="image" fluid />
                <Card.Text as="h1">{genre.Genre.Name}</Card.Text>
                <Card.Text>Description: {genre.Genre.Description}</Card.Text>
                <Card.Text>
                  Examples of good {genre.Genre.Name} movies:<br></br>
                  {genre.Genre.Ex}
                </Card.Text>
                <Link to="/">
                  <Button variant="danger"> Back to Movies </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
  }),
};
