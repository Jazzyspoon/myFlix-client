import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";

class FavButton extends React.Component {
  constructor(props) {
    super();

    this.state = {};
  }
  addItem(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://movieflixappjp.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // window.open("/", "_self");
        window.open("/users/" + localStorage.getItem("user"), "_self");
        alert("Added to favorites!");
      });
  }

  render() {
    const { Favoritemovies, movies } = this.props;
    Favoritemovies = this.state.Favoritemovies;

    return (
      <Button
        variant="success"
        size="sm"
        onClick={(e) => this.addItem(movie)}
      ></Button>
    );
  }
}
export default FavButton;
