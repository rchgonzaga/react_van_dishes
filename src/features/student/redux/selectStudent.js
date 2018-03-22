import {
  STUDENT_SELECT_STUDENT,
} from './constants';

export function selectStudent(student) {
  return {
    type: STUDENT_SELECT_STUDENT,
    payload: student
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STUDENT_SELECT_STUDENT:
      return {
        ...state,
        selectedStudent: action.payload
      };

    default:
      return state;
  }
}
