import axios from 'axios';
import {
  STUDENT_LOAD_STUDENT_LIST_BEGIN,
  STUDENT_LOAD_STUDENT_LIST_SUCCESS,
  STUDENT_LOAD_STUDENT_LIST_FAILURE,
  STUDENT_LOAD_STUDENT_LIST_DISMISS_ERROR,
} from './constants';

const apiUrl = 'http://localhost:3000/students/';

export function loadStudentList(args = {}) {
  return (dispatch) => {
    dispatch({
      type: STUDENT_LOAD_STUDENT_LIST_BEGIN,
    });
    return new Promise((resolve, reject) => {
      axios.get(apiUrl).then(
        (res) => {
          dispatch({
            type: STUDENT_LOAD_STUDENT_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: STUDENT_LOAD_STUDENT_LIST_FAILURE,
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
export function dismissLoadStudentListError() {
  return {
    type: STUDENT_LOAD_STUDENT_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STUDENT_LOAD_STUDENT_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadStudentListPending: true,
        loadStudentListError: null,
      };

    case STUDENT_LOAD_STUDENT_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        loadStudentListPending: false,
        loadStudentListError: null,
        studentList: action.data
      };

    case STUDENT_LOAD_STUDENT_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        loadStudentListPending: false,
        loadStudentListError: action.data.error,
      };

    case STUDENT_LOAD_STUDENT_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadStudentListError: null,
      };

    default:
      return state;
  }
}
