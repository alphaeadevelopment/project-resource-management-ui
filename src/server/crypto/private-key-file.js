import fs from 'fs';
import path from 'path';

const keyName = process.env.PRIVATE_KEY_FILE || 'private.key';

export default fs.readFileSync(path.join(__dirname, '../../../keys', keyName));
