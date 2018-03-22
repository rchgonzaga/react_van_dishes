// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  STUDENT_UNSELECT_STUDENT,
} from './constants';

export function unselectStudent() {
  return {
    type: STUDENT_UNSELECT_STUDENT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STUDENT_UNSELECT_STUDENT:
      return {
        ...state,
        selectedStudent: null,
      };

    default:
      return state;
  }
}
