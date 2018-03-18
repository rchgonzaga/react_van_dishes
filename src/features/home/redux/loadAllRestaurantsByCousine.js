import axios from 'axios';
import {
  HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_BEGIN,
  HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_SUCCESS,
  HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_FAILURE,
  HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_DISMISS_ERROR,
} from './constants';

export function loadAllRestaurantsByCousine(cousineId = 0) {
  return (dispatch) => {
    dispatch({
      type: HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_BEGIN,
    });
    return new Promise((resolve, reject) => {
      axios.get(`http://api-vanhack-event-sp.azurewebsites.net/api/v1/Cousine/${cousineId}/stores`).then(
        (res) => {
          dispatch({
            type: HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_FAILURE,
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
export function dismissLoadAllRestaurantsByCousineError() {
  return {
    type: HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadAllRestaurantsByCousinePending: true,
        loadAllRestaurantsByCousineError: null,
      };

    case HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_SUCCESS:
      // The request is success
      return {
        ...state,
        loadAllRestaurantsByCousinePending: false,
        loadAllRestaurantsByCousineError: null,
        restaurantList: action.data
      };

    case HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadAllRestaurantsByCousinePending: false,
        loadAllRestaurantsByCousineError: action.data.error,
      };

    case HOME_LOAD_ALL_RESTAURANTS_BY_COUSINE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadAllRestaurantsByCousineError: null,
      };

    default:
      return state;
  }
}
