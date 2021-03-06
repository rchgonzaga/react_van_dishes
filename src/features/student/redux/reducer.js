import initialState from './initialState';
import { reducer as loadStudentListReducer } from './loadStudentList';
import { reducer as showModalNewStudentReducer } from './showModalNewStudent';
import { reducer as closeModalNewStudentReducer } from './closeModalNewStudent';
import { reducer as loadGenreListReducer } from './loadGenreList';
import { reducer as loadSchoolListReducer } from './loadSchoolList';
import { reducer as saveNewStudentReducer } from './saveNewStudent';
import { reducer as selectStudentReducer } from './selectStudent';
import { reducer as unselectStudentReducer } from './unselectStudent';
import { reducer as updateStudentReducer } from './updateStudent';

const reducers = [
  loadStudentListReducer,
  showModalNewStudentReducer,
  closeModalNewStudentReducer,
  loadGenreListReducer,
  loadSchoolListReducer,
  saveNewStudentReducer,
  selectStudentReducer,
  unselectStudentReducer,
  updateStudentReducer,
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
