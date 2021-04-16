import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

class FavButton extends React.Component {
  constructor(props) {
    super();

    this.state = {
      Username: null,
      Movies: [],
      Favoritemovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }
  addItem(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://movieflixappjp.herokuapp.com/users/${username}/Favoritemovies/${movie}`,
        {
          headers: { Authorization: `Bearer ${token}` },

          Favoritemovies: this.Favoritemovies,
        }
      )
      .then(() => {
        alert("Movie was added to your Favorites");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { Favoritemovies, movies } = this.props;
    Favoritemovies = this.state.Favoritemovies;

    return (
      <Button
        variant="success"
        size="sm"
        onClick={(e) => this.addItem(e, movie._id)}
      ></Button>
    );
  }
}
export default FavButton;
