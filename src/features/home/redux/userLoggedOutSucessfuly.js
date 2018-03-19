import {
  HOME_USER_LOGGED_OUT_SUCESSFULY,
} from './constants';

export function userLoggedOutSucessfuly() {
  return {
    type: HOME_USER_LOGGED_OUT_SUCESSFULY,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_USER_LOGGED_OUT_SUCESSFULY:
      return {
        ...state,
        loggedIn: false,
        loggedInMsg: 'NOT LOGGED!',
        userId: 0,
        userName: 'NO USER',
      };

    default:
      return state;
  }
}
