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
    const { director, movies } = this.props;
    if (!director) return null;

    return (
      <div className="movie-view">
        <Col>
          <Image src={director.Director.ImagePath} className="image" fluid />
        </Col>
        <Col>
          <Card style={{ width: "25rem" }} className="cardbody">
            <Card.Header>
              <h1>{director.Director.Name} (Director)</h1>
            </Card.Header>
            <Card.Body>
              <Card.Text>Bio: {director.Director.Bio}</Card.Text>
              <Card.Text>Birthdate: {director.Director.Birth}</Card.Text>
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
      Death: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
