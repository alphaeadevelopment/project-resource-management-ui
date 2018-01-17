import jwt from 'jsonwebtoken';
import { publicKeyFile } from '../crypto';

export default token => (
  new Promise((res) => {
    jwt.verify(
      token,
      publicKeyFile,
      { algorithms: ['RS256'] },
      (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            res({
              statusCode: 403,
              message: 'Session expired',
            });
          }
          else {
            res({
              statusCode: 403,
              message: err.message,
              err,
            });
          }
        }
        else {
          res({
            statusCode: 200,
            token,
            ...decoded,
          });
        }
      },
    );
  })
);
