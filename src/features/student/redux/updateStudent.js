import axios from 'axios';
import {
  STUDENT_UPDATE_STUDENT_BEGIN,
  STUDENT_UPDATE_STUDENT_SUCCESS,
  STUDENT_UPDATE_STUDENT_FAILURE,
  STUDENT_UPDATE_STUDENT_DISMISS_ERROR,
} from './constants';

const apiUrl = 'http://localhost:3000/students/';

export function updateStudent(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: STUDENT_UPDATE_STUDENT_BEGIN,
    });

    return new Promise((resolve, reject) => {
      axios.put(apiUrl + args.id, args).then(
        (res) => {
          dispatch({
            type: STUDENT_UPDATE_STUDENT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: STUDENT_UPDATE_STUDENT_FAILURE,
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
export function dismissUpdateStudentError() {
  return {
    type: STUDENT_UPDATE_STUDENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STUDENT_UPDATE_STUDENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateStudentPending: true,
        updateStudentError: null,
      };

    case STUDENT_UPDATE_STUDENT_SUCCESS:
      // The request is success
      return {
        ...state,
        updateStudentPending: false,
        updateStudentError: null,
      };

    case STUDENT_UPDATE_STUDENT_FAILURE:
      // The request is failed
      return {
        ...state,
        updateStudentPending: false,
        updateStudentError: action.data.error,
      };

    case STUDENT_UPDATE_STUDENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateStudentError: null,
      };

    default:
      return state;
  }
}
