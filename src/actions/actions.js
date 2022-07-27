export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const ADD_FAVMOVIE = 'ADD_FAVMOVIE';
export const REM_FAVMOVIE = 'REM_FAVMOVIE';
export const SET_FAVORITES = 'SET_FAVORITES';


export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(user) {
  return { type: SET_USER, value: user };
}

export const updateUser = (value) => {
  return { type: UPDATE_USER, value };
};

export const deleteUser = (value) => {
  return { type: DELETE_USER, value };
};

export function addFavMovie(value) {
  return { type: ADD_FAVMOVIE, value };
}

export function remFavMovie(value) {
  return { type: REM_FAVMOVIE, value };
}

export function setFavorites(value) {
  return { type: SET_FAVORITES, value };
}


