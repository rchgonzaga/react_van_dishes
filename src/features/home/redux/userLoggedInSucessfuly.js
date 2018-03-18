import {
  HOME_USER_LOGGED_IN_SUCESSFULY,
} from './constants';

export function userLoggedInSucessfuly() {
  return {
    type: HOME_USER_LOGGED_IN_SUCESSFULY,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_USER_LOGGED_IN_SUCESSFULY:
      return {
        ...state,
        loggedIn: true,
        loggedInMsg: 'LOGGED!',
        userId: 1893276,
        userName: 'Rafae Gonzaga',
      };

    default:
      return state;
  }
}
