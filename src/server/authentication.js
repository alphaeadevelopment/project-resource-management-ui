import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const cert = fs.readFileSync(path.join(__dirname, 'private.key'));

export const loginHandler = (req, res) => {
  const token = jwt.sign(
    { 'user': 'graham' },
    { key: cert, passphrase: process.env.RSA_PASSPHRASE },
    { algorithm: 'RS256' },
  );
  res.send({
    token,
    statusCode: 200,
  });
};
export const validateHandler = (req, res) => {
  const { body } = req;
  console.log(body);
  const { token } = body;
  const payload = jwt.verify(token, cert, { algorithm: 'RS256' });
  console.log('verified ', payload);
  res.send({
    statusCode: 200,
  });
};
export const keepAliveHandler = (req, res) => {
  console.log(req.body);
  res.send({
    statusCode: 200,
  });
};
