import publicKeyFile from './public-key-file';
import { keyFromFile } from '../../common/crypto';

export default keyFromFile(publicKeyFile, 'pkcs1-public-pem');
