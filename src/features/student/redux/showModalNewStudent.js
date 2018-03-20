import {
  STUDENT_SHOW_MODAL_NEW_STUDENT,
} from './constants';

export function showModalNewStudent() {
  return {
    type: STUDENT_SHOW_MODAL_NEW_STUDENT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STUDENT_SHOW_MODAL_NEW_STUDENT:
      return {
        ...state,
        modalNewUserVisible: true,
      };

    default:
      return state;
  }
}
