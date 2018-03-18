import axios from 'axios';
import {
  HOME_LOAD_ALL_DISHES_BY_RESTAURANT_BEGIN,
  HOME_LOAD_ALL_DISHES_BY_RESTAURANT_SUCCESS,
  HOME_LOAD_ALL_DISHES_BY_RESTAURANT_FAILURE,
  HOME_LOAD_ALL_DISHES_BY_RESTAURANT_DISMISS_ERROR,
} from './constants';

export function loadAllDishesByRestaurant(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_LOAD_ALL_DISHES_BY_RESTAURANT_BEGIN,
    });
    return new Promise((resolve, reject) => {
      axios.get(`http://api-vanhack-event-sp.azurewebsites.net/api/v1/Store/${args}/products`).then(
        (res) => {
          dispatch({
            type: HOME_LOAD_ALL_DISHES_BY_RESTAURANT_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_LOAD_ALL_DISHES_BY_RESTAURANT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoadAllDishesByRestaurantError() {
  return {
    type: HOME_LOAD_ALL_DISHES_BY_RESTAURANT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_LOAD_ALL_DISHES_BY_RESTAURANT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadAllDishesByRestaurantPending: true,
        loadAllDishesByRestaurantError: null,
      };

    case HOME_LOAD_ALL_DISHES_BY_RESTAURANT_SUCCESS:
      // The request is success
      return {
        ...state,
        loadAllDishesByRestaurantPending: false,
        loadAllDishesByRestaurantError: null,
        dishesList: action.data
      };

    case HOME_LOAD_ALL_DISHES_BY_RESTAURANT_FAILURE:
      // The request is failed
      return {
        ...state,
        loadAllDishesByRestaurantPending: false,
        loadAllDishesByRestaurantError: action.data.error,
      };

    case HOME_LOAD_ALL_DISHES_BY_RESTAURANT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadAllDishesByRestaurantError: null,
      };

    default:
      return state;
  }
}
