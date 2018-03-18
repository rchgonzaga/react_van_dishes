import { expect } from 'chai';

import {
  HOME_USER_LOGGED_OUT_SUCESSFULY,
} from 'src/features/home/redux/constants';

import {
  userLoggedOutSucessfuly,
  reducer,
} from 'src/features/home/redux/userLoggedOutSucessfuly';

describe('home/redux/userLoggedOutSucessfuly', () => {
  it('returns correct action by userLoggedOutSucessfuly', () => {
    expect(userLoggedOutSucessfuly()).to.have.property('type', HOME_USER_LOGGED_OUT_SUCESSFULY);
  });

  it('handles action type HOME_USER_LOGGED_OUT_SUCESSFULY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_USER_LOGGED_OUT_SUCESSFULY }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
