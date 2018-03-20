import initialState from './initialState';
import { reducer as loadStudentListReducer } from './loadStudentList';
import { reducer as showModalNewStudentReducer } from './showModalNewStudent';
import { reducer as closeModalNewStudentReducer } from './closeModalNewStudent';

const reducers = [
  loadStudentListReducer,
  showModalNewStudentReducer,
  closeModalNewStudentReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
