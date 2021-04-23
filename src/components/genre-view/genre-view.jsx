import React from "react";
import PropTypes from "prop-types";
import { Col, Button, Image, Card } from "react-bootstrap";
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
      <Col className="genre-view">
        <div>
          <div className="card mb-3 cardbody">
            <div className="row no-gutters">
              <div className="col-md-5">
                <Image src={genre.Genre.ImagePath} className="image" fluid />
              </div>
              <div className="col-md-7">
                <Card.Body>
                  <Card.Text as="h1">{genre.Genre.Name}</Card.Text>
                  <Card.Text>Description: {genre.Genre.Description}</Card.Text>
                  <Card.Text>
                    Examples of {genre.Genre.Name} movies: {genre.Genre.Ex}
                  </Card.Text>
                  <Link to={`/`}>
                    <Button variant="danger"> Back to Movies </Button>
                  </Link>
                </Card.Body>
              </div>
            </div>
          </div>
        </div>
      </Col>
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
