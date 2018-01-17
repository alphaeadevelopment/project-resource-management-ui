import publicKeyFile from 'publickey.pem'; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import { keyFromFile } from '../../common/crypto';

export default keyFromFile(publicKeyFile, 'pkcs1-public-pem');

