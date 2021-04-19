import React from "react";
import PropTypes from "prop-types";
import { Col, Button, Image, Card } from "react-bootstrap";
import { Link, Router } from "react-router-dom";
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
        <div className="card mb-3 cardbody" style={{ width: "800px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <Image
                src={director.Director.ImagePath}
                className="image"
                fluid
              />
            </div>
            <div className="col-md-8">
              <Card.Body>
                <Card.Text as="h1">{director.Director.Name}</Card.Text>
                <Card.Text as="h2">(Director)</Card.Text>
                <Card.Text> {director.Director.Bio}</Card.Text>
                <Card.Text>Born: {director.Director.Birth}</Card.Text>
                <Card.Text>Died: {director.Director.Death}</Card.Text>

                <Link to={`/`}>
                  <Button variant="danger">Back to Movies</Button>
                </Link>
              </Card.Body>
            </div>
          </div>
        </div>
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
