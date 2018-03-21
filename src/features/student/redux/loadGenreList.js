import axios from 'axios';
import {
  STUDENT_LOAD_GENRE_LIST_BEGIN,
  STUDENT_LOAD_GENRE_LIST_SUCCESS,
  STUDENT_LOAD_GENRE_LIST_FAILURE,
  STUDENT_LOAD_GENRE_LIST_DISMISS_ERROR,
} from './constants';

const apiUrl = 'http://localhost:3000/genres/';

export function loadGenreList(args = {}) {
  return (dispatch) => {
    dispatch({
      type: STUDENT_LOAD_GENRE_LIST_BEGIN,
    });

    return new Promise((resolve, reject) => {
      axios.get(apiUrl).then(
        (res) => {
          dispatch({
            type: STUDENT_LOAD_GENRE_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: STUDENT_LOAD_GENRE_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissLoadGenreListError() {
  return {
    type: STUDENT_LOAD_GENRE_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STUDENT_LOAD_GENRE_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadGenreListPending: true,
        loadGenreListError: null,
      };

    case STUDENT_LOAD_GENRE_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        loadGenreListPending: false,
        loadGenreListError: null,
        genreList: action.data,
      };

    case STUDENT_LOAD_GENRE_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        loadGenreListPending: false,
        loadGenreListError: action.data.error,
      };

    case STUDENT_LOAD_GENRE_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadGenreListError: null,
      };

    default:
      return state;
  }
}
