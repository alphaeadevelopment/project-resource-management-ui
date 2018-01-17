import fs from 'fs';
import path from 'path';

const keyName = process.env.PUBLIC_KEY_FILE || 'publickey.pem';

export default fs.readFileSync(path.join(__dirname, '../../../keys', keyName));
