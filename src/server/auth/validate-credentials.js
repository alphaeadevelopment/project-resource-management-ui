import omit from 'lodash/omit';
import users from './users.json';
import { decrypt, digest } from '../crypto';

export default ({ username, encryptedNonce, noncedPasswordDigest }) => {
  if (!username || !encryptedNonce || !noncedPasswordDigest) return null;

  const user = users[username] || {};
  const noncedStoredPassword = digest(user.password || '', decrypt(encryptedNonce));

  if (noncedStoredPassword === noncedPasswordDigest) {
    return {
      ...omit(user, 'password'),
      username,
    };
  }
  return null;
};
