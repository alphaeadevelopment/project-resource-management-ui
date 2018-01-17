
import { decryptUsingKey } from '../../common/crypto';
import privateKey from './private-key';

export const decrypt = decryptUsingKey(privateKey);
export { digest } from '../../common/crypto';
