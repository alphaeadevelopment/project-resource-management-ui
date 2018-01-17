import privateKeyFile from './private-key-file';
import { keyFromFile } from '../../common/crypto';

export default keyFromFile(privateKeyFile, 'pkcs1-private-pem');

