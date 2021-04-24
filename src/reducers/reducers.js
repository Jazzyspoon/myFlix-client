import { combineReducers } from "redux";

<<<<<<< Updated upstream
import { SET_FILTER, SET_MOVIES, ADD_FAV } from "../actions/actions";
=======
import {
  SET_FILTER,
  SET_MOVIES,
  SET_USERS,
  TOGGLE_PASSWORD,
} from "../actions/actions";
>>>>>>> Stashed changes

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

<<<<<<< Updated upstream
function addfavorite(state = [], action) {
  switch (action.type) {
    case ADD_FAV:
=======
function user(
  state = {
    Username: localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "",
    Password: "",
    Email: "",
    Birthday: "",
  },
  action
) {
  switch (action.type) {
    case SET_USERS:
>>>>>>> Stashed changes
      return action.value;
    default:
      return state;
  }
}
<<<<<<< Updated upstream

function moviesApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action),
    addfavorite: addfavorite(state.addfavorite, action),
  };
=======
function togglepassword(
  state = {
    type: "password",
    word: "Show",
  },
  action
) {
  switch (action.type) {
    case TOGGLE_PASSWORD:
      return action.value;
    default:
      return state;
  }
>>>>>>> Stashed changes
}
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  togglepassword,
});

export default moviesApp;
