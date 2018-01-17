import update from 'immutability-helper';
import { window } from '@alphaeadev/js-services';
import { SUCCESSFUL_LOGIN, FAILED_LOGIN, LOGOUT } from '../../action-types';

const initial = {
  isLoggedIn: false,
  username: null,
  token: window.localStorage.getItem('token'),
};
export default (state = initial, { type, payload }) => {
  switch (type) {
    case SUCCESSFUL_LOGIN:
      return update(state, { isLoggedIn: { $set: true }, username: { $set: payload.username } });
    case FAILED_LOGIN:
      return update(state, { isLoggedIn: { $set: false }, errorMessage: { $set: payload.message } });
    case LOGOUT:
      return update(state, { isLoggedIn: { $set: false } });
    default:
      return state;
  }
};
