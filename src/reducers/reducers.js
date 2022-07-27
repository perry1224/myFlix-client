import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER, SET_FAVORITES, DELETE_USER, ADD_FAVMOVIE, REM_FAVMOVIE } from '../actions/actions';

function visibilityFilter(state = '', action) {
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


function user(state = null, action) {

  switch (action.type) {
    case SET_USER:
      return action.value;
    case UPDATE_USER:
      return action.value;
    case DELETE_USER:
      return action.value;
      case ADD_FAVMOVIE:
        return {
          ...state,
          favoriteMovies: [...state?.favoriteMovies, action.value],
        };
      case REM_FAVMOVIE:
        return {
          ...state,
          favoriteMovies: [
            ...state?.favoriteMovies.filter(
              (movieId) => movieId !== action.value
            ),
          ],
        };
      default:
        return state;
  }
}


const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,

});

// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   }
// }


export default moviesApp;
