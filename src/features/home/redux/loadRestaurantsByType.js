import axios from 'axios';
import {
  HOME_LOAD_RESTAURANTS_BY_TYPE_BEGIN,
  HOME_LOAD_RESTAURANTS_BY_TYPE_SUCCESS,
  HOME_LOAD_RESTAURANTS_BY_TYPE_FAILURE,
  HOME_LOAD_RESTAURANTS_BY_TYPE_DISMISS_ERROR,
} from './constants';

export function loadRestaurantsByType() {
  return (dispatch) => {
    dispatch({
      type: HOME_LOAD_RESTAURANTS_BY_TYPE_BEGIN,
    });
    return new Promise((resolve, reject) => {
      axios.get('http://api-vanhack-event-sp.azurewebsites.net/api/v1/Cousine').then(
        (res) => {
          dispatch({
            type: HOME_LOAD_RESTAURANTS_BY_TYPE_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_LOAD_RESTAURANTS_BY_TYPE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

export function dismissLoadRestaurantsByTypeError() {
  return {
    type: HOME_LOAD_RESTAURANTS_BY_TYPE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_LOAD_RESTAURANTS_BY_TYPE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadRestaurantsByGpsPositionPending: true,
        loadRestaurantsByGpsPositionError: null,
      };

    case HOME_LOAD_RESTAURANTS_BY_TYPE_SUCCESS:
      // The request is success
      return {
        ...state,
        loadRestaurantsByGpsPositionPending: false,
        loadRestaurantsByGpsPositionError: null,
        restaurantTypeList: action.data
      };

    case HOME_LOAD_RESTAURANTS_BY_TYPE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadRestaurantsByGpsPositionPending: false,
        loadRestaurantsByGpsPositionError: action.data.error,
      };

    case HOME_LOAD_RESTAURANTS_BY_TYPE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadRestaurantsByGpsPositionError: null,
      };

    default:
      return state;
  }
}
