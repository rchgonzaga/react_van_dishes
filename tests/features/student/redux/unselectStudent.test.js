import { expect } from 'chai';

import {
  STUDENT_UNSELECT_STUDENT,
} from 'src/features/student/redux/constants';

import {
  unselectStudent,
  reducer,
} from 'src/features/student/redux/unselectStudent';

describe('student/redux/unselectStudent', () => {
  it('returns correct action by unselectStudent', () => {
    expect(unselectStudent()).to.have.property('type', STUDENT_UNSELECT_STUDENT);
  });

  it('handles action type STUDENT_UNSELECT_STUDENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: STUDENT_UNSELECT_STUDENT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
