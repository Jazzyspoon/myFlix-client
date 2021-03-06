import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Col, Button, Image, Card } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./movie-view.scss";
class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  //add to favorites function
  addToFavorites(movie) {
    const { token } = this.props.user;
    const { Username } = this.props.user.user;
    let url = `https://movieflixappjp.herokuapp.com/users/${Username}/movies/${movie._id}`;
    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Added to favorites!");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { movie } = this.props;

    if (!movie) return null;
    return (
      <Col className="movie-view">
        <div>
          <div className="card mb-3 cardbody">
            <div className="row no-gutters">
              <div className="col-md-4">
                <Image src={movie.ImagePath} className="image" fluid />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Text as="h1">{movie.Title}</Card.Text>
                  <Card.Text as="h5">
                    <Image src={movie.Rating} className="rating" />
                  </Card.Text>
                  <Card.Text as="h6">(Imdb score: {movie.Imdb})</Card.Text>
                  <Card.Text as="h5">"{movie.Description}"</Card.Text>
                  <Card.Text as="h5">
                    Starring:
                    {movie.Actors}{" "}
                  </Card.Text>
                  <Card.Text as="h5">
                    Director:<br></br>
                    {movie.Director.Name}{" "}
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button size="sm" variant="dark">
                        (Bio)
                      </Button>
                    </Link>{" "}
                  </Card.Text>
                  <Card.Text as="h5">
                    Genre:<br></br>
                    {movie.Genre.Name}{" "}
                    <Link to={`/genres/${movie.Genre.Name}`}>
                      <Button size="sm" variant="dark">
                        (What is {movie.Genre.Name}?){" "}
                      </Button>
                    </Link>
                  </Card.Text>
                  <div>
                    <Button
                      className="favbutton"
                      variant="success"
                      onClick={() => this.addToFavorites(movie)}
                    >
                      Add to Favorites
                    </Button>
                  </div>
                  <Link to={`/`}>
                    <Button className="favbutton" variant="danger">
                      Back to Movies
                    </Button>
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
let mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(MovieView);
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Actors: PropTypes.string.isRequired,
    Imdb: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired,
  }).isRequired,
};
