import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Image, Card } from "react-bootstrap";
import { BrowserRouter as Link } from "react-router-dom";
import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  onbackClick() {
    window.open("/movies");
  }
  render() {
    const { genre, movie: movieData } = this.props;
    if (!genre) return null;
    // if (this.state.initialState === "") return;
    return (
      <Row className="movie-view">
        <Col>
          <Image src={movieData.Genre.ImagePath} className="image" fluid />
        </Col>
        <Card style={{ width: "25rem" }} className="cardbody">
          <Card.Header>
            <h1>Genre: {movieData.Genre.Name}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>Description: {movieData.Genre.Description}</Card.Text>
            <Card.Text>
              Examples of {movieData.Genre.Name} Movies: {movieData.Director.Ex}
            </Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button onClick={() => this.onbackClick(null)} variant="danger">
                Back
              </Button>
            </Link>
          </Card.Body>
        </Card>
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
