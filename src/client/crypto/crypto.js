import uuid from 'uuid/v4';
import { encryptUsingKey, digest } from '../../common/crypto';
import key from './public-key';

export const encrypt = encryptUsingKey(key);

export const hashPassword = (username, password) => {
  const nonce = uuid();
  const encryptedNonce = encrypt(nonce, 'base64');
  const passwordDigest = digest(username, password);
  // eslint-disable-next-line new-cap
  const noncedPasswordDigest = digest(passwordDigest, nonce);
  return {
    noncedPasswordDigest,
    encryptedNonce,
  };
};
