import { expect } from 'chai';

import {
  HOME_USER_LOGGED_IN_SUCESSFULY,
} from 'src/features/home/redux/constants';

import {
  userLoggedInSucessfuly,
  reducer,
} from 'src/features/home/redux/userLoggedInSucessfuly';

describe('home/redux/userLoggedInSucessfuly', () => {
  it('returns correct action by userLoggedInSucessfuly', () => {
    expect(userLoggedInSucessfuly()).to.have.property('type', HOME_USER_LOGGED_IN_SUCESSFULY);
  });

  it('handles action type HOME_USER_LOGGED_IN_SUCESSFULY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_USER_LOGGED_IN_SUCESSFULY }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
