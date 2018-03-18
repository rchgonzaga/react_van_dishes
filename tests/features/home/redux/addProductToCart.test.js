import { expect } from 'chai';

import {
  HOME_ADD_PRODUCT_TO_CART,
} from 'src/features/home/redux/constants';

import {
  addProductToCart,
  reducer,
} from 'src/features/home/redux/addProductToCart';

describe('home/redux/addProductToCart', () => {
  it('returns correct action by addProductToCart', () => {
    expect(addProductToCart()).to.have.property('type', HOME_ADD_PRODUCT_TO_CART);
  });

  it('handles action type HOME_ADD_PRODUCT_TO_CART correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_ADD_PRODUCT_TO_CART }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
