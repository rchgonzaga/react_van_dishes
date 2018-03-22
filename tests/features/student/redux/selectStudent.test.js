import { expect } from 'chai';

import {
  STUDENT_SELECT_STUDENT,
} from 'src/features/student/redux/constants';

import {
  selectStudent,
  reducer,
} from 'src/features/student/redux/selectStudent';

describe('student/redux/selectStudent', () => {
  it('returns correct action by selectStudent', () => {
    expect(selectStudent()).to.have.property('type', STUDENT_SELECT_STUDENT);
  });

  it('handles action type STUDENT_SELECT_STUDENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: STUDENT_SELECT_STUDENT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
