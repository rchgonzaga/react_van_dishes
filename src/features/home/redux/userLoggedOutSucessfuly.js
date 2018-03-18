// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

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
        loggedInMsg: 'Not logged!',
        userId: -1,
        userName: '',
      };

    default:
      return state;
  }
}
