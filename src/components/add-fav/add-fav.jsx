import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";
import { addtoFavorites } from "../../actions/actions";

function AddFavoriteMovie(movie) {
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

      alert("Added to favorites!");
    });
}

return (
  <Button
    className="favbutton"
    variant="success"
    onClick={() => this.AddFavoriteMovie(movie)}
  >
    Add to Favorites
  </Button>
);

export default connect(null, { addtoFavorites })(AddFavoriteMovie);
