import { expect } from 'chai';

import {
  STUDENT_SHOW_MODAL_NEW_STUDENT,
} from 'src/features/student/redux/constants';

import {
  showModalNewStudent,
  reducer,
} from 'src/features/student/redux/showModalNewStudent';

describe('student/redux/showModalNewStudent', () => {
  it('returns correct action by showModalNewStudent', () => {
    expect(showModalNewStudent()).to.have.property('type', STUDENT_SHOW_MODAL_NEW_STUDENT);
  });

  it('handles action type STUDENT_SHOW_MODAL_NEW_STUDENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: STUDENT_SHOW_MODAL_NEW_STUDENT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
