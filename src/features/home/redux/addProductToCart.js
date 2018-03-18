// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { HOME_ADD_PRODUCT_TO_CART } from './constants';

export function addProductToCart(product) {
  return {
    type: HOME_ADD_PRODUCT_TO_CART,
    payload: product,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    default:
      return state;
  }
}
