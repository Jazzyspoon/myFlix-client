import React from "react";
import PropTypes from "prop-types";
import { Col, Button, Image, Card, Row } from "react-bootstrap";
import { BrowserRouter as Link } from "react-router-dom";
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
              <Card.Header>
                <Image src={genre.Genre.ImagePath} className="image" fluid />
                <h1>{genre.Genre.Name}</h1>
              </Card.Header>
              <Card.Body>
                <Card.Text>Description: {genre.Genre.Description}</Card.Text>
                <Card.Text>
                  Examples of {genre.Genre.Name} movies: {genre.Genre.Ex}
                </Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="danger">Back</Button>
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
