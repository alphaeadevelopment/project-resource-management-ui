import sha from 'sha.js';
import NodeRSA from 'node-rsa';

export const BASE64 = 'base64';

export const decryptUsingKey = key => str => key.decrypt(Buffer.from(str, BASE64)).toString();

export const encryptUsingKey = key => str => key.encrypt(str, BASE64).toString();

export const digest = (...args) => {
  // eslint-disable-next-line new-cap
  const sha256 = new sha.sha256();
  for (let i = 0; i < args.length; i++) {
    sha256.update(args[i]);
  }
  return sha256.digest(BASE64);
};

export const keyFromFile = (keyFile, type) => {
  const key = new NodeRSA();
  key.importKey(keyFile, type);
  return key;
};
