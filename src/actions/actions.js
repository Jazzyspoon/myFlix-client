export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const ADD_FAV = "ADD_FAV";

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function addtoFavorites(value) {
  return {
    type: ADD_FAV,
    value,
  };
}
