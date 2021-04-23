import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, ADD_FAV } from "../actions/actions";

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

function addfavorite(state = [], action) {
  switch (action.type) {
    case ADD_FAV:
      return action.value;
    default:
      return state;
  }
}

function moviesApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action),
    addfavorite: addfavorite(state.addfavorite, action),
  };
}

export default moviesApp;
