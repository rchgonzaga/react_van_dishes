import axios from 'axios';
import {
  STUDENT_SAVE_NEW_STUDENT_BEGIN,
  STUDENT_SAVE_NEW_STUDENT_SUCCESS,
  STUDENT_SAVE_NEW_STUDENT_FAILURE,
  STUDENT_SAVE_NEW_STUDENT_DISMISS_ERROR,
} from './constants';

const apiUrl = 'http://localhost:3000/students';

export function saveNewStudent(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: STUDENT_SAVE_NEW_STUDENT_BEGIN,
    });

    return new Promise((resolve, reject) => {
      return axios.post(apiUrl, args).then(
        (res) => {
          dispatch({
            type: STUDENT_SAVE_NEW_STUDENT_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: STUDENT_SAVE_NEW_STUDENT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSaveNewStudentError() {
  return {
    type: STUDENT_SAVE_NEW_STUDENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STUDENT_SAVE_NEW_STUDENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        saveNewStudentPending: true,
        saveNewStudentError: null,
      };

    case STUDENT_SAVE_NEW_STUDENT_SUCCESS:
      // The request is success
      return {
        ...state,
        saveNewStudentPending: false,
        saveNewStudentError: null,
        userSaved: true,
      };

    case STUDENT_SAVE_NEW_STUDENT_FAILURE:
      // The request is failed
      return {
        ...state,
        saveNewStudentPending: false,
        saveNewStudentError: action.data.error,
      };

    case STUDENT_SAVE_NEW_STUDENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        saveNewStudentError: null,
      };

    default:
      return state;
  }
}
