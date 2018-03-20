import { expect } from 'chai';

import {
  STUDENT_CLOSE_MODAL_NEW_STUDENT,
} from 'src/features/student/redux/constants';

import {
  closeModalNewStudent,
  reducer,
} from 'src/features/student/redux/closeModalNewStudent';

describe('student/redux/closeModalNewStudent', () => {
  it('returns correct action by closeModalNewStudent', () => {
    expect(closeModalNewStudent()).to.have.property('type', STUDENT_CLOSE_MODAL_NEW_STUDENT);
  });

  it('handles action type STUDENT_CLOSE_MODAL_NEW_STUDENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: STUDENT_CLOSE_MODAL_NEW_STUDENT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
