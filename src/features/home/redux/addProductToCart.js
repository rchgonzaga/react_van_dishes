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
