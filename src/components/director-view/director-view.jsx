import React from "react";
import PropTypes from "prop-types";
import { Col, Button, Image, Card } from "react-bootstrap";
import { BrowserRouter as Link, Router } from "react-router-dom";
import "./director-view.scss";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { director, movies: movie } = this.props;
    if (!director) return null;

    return (
      <div className="movie-view">
        <Col>
          <Card style={{ width: "30rem" }} className="cardbody">
            <Card.Header>
              <Image
                src={director.Director.ImagePath}
                className="image"
                fluid
              />
            </Card.Header>
            <Card.Body>
              <h1>{director.Director.Name}</h1> <h2>(Director)</h2>
              <Card.Text>Bio: {director.Director.Bio}</Card.Text>
              <Card.Text>Birthyear: {director.Director.Birth}</Card.Text>
              <Card.Text>Deceased: {director.Director.Death}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="danger">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}
DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
      ImagePath: PropTypes.string.isRequired,
    }),
  }),
};
