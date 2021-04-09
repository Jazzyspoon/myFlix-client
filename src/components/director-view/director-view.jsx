import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Image, Card } from "react-bootstrap";
import "./director-view.scss";

export class DirectorView extends React.Component {
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
          <Image src={movieData.Director.Image} className="image" fluid />
        </Col>
        <Col className="cardbody">
          <Card.Header>
            <h1>{movieData.Director} (Director)</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>Bio: {movieData.Director.Bio}</Card.Text>

            <Card.Text>
              Director Birthdate: {movieData.Director.Birth}
            </Card.Text>
            <Card.Text>
              Director Birthdate: {movieData.Director.Death}
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
DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};
