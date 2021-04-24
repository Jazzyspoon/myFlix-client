export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
<<<<<<< Updated upstream
export const ADD_FAV = "ADD_FAV";
=======
export const SET_USER = "SET_USER";
export const TOGGLE_PASSWORD = "TOGGLE_PW";
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
export function addtoFavorites(value) {
  return {
    type: ADD_FAV,
    value,
  };
}
=======
export function setUser(value) {
  return {
    type: SET_USERS,
    value,
  };
}

export function updateUser(value) {
  return {
    type: UPDATE_USERS,
    value,
  };
}
export function unregUser(value) {
  return {
    type: UNREG_USERS,
    value,
  };
}
export function togglePassword(value) {
  return { type: TOGGLE_PASSWORD, value };
}
>>>>>>> Stashed changes
