import { expect } from 'chai';

import {
  HOME_REMOVE_PRODUCT_FROM_CART,
} from 'src/features/home/redux/constants';

import {
  removeProductFromCart,
  reducer,
} from 'src/features/home/redux/removeProductFromCart';

describe('home/redux/removeProductFromCart', () => {
  it('returns correct action by removeProductFromCart', () => {
    expect(removeProductFromCart()).to.have.property('type', HOME_REMOVE_PRODUCT_FROM_CART);
  });

  it('handles action type HOME_REMOVE_PRODUCT_FROM_CART correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_REMOVE_PRODUCT_FROM_CART }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
