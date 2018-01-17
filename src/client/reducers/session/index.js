import update from 'immutability-helper';
import { window } from '@alphaeadev/js-services';
import {
  SUCCESSFUL_LOGIN, FAILED_LOGIN, LOGOUT, SESSION_VALIDATED, SESSION_REFRESHED,
} from '../../action-types';

const initial = {
  isLoggedIn: false,
  user: null,
  token: window.localStorage.getItem('token'),
};
export default (state = initial, { type, payload }) => {
  switch (type) {
    case SESSION_VALIDATED:
      return update(state, {
        isLoggedIn: { $set: true },
        user: { $set: payload.user },
        errorMessage: { $set: null },
        token: { $set: payload.token },
      });
    case SESSION_REFRESHED:
      return update(state, {
        token: { $set: payload.token },
      });
    case SUCCESSFUL_LOGIN:
      return update(state, {
        isLoggedIn: { $set: true },
        user: { $set: payload.user },
        errorMessage: { $set: null },
        token: { $set: payload.token },
      });
    case FAILED_LOGIN:
      return update(state, {
        isLoggedIn: { $set: false },
        user: { $set: null },
        errorMessage: { $set: payload.message },
        token: { $set: null },
      });
    case LOGOUT:
      return update(state, {
        isLoggedIn: { $set: false },
        user: { $set: null },
        errorMessage: { $set: null },
        token: { $set: null },
      });
    default:
      return state;
  }
};
