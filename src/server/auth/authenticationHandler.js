import validateCredentials from './validate-credentials';
import verifyJwtToken from './verifyJwtToken';
import createJwtToken from './createJwtToken';

export const loginHandler = (req, res) => {
  const user = validateCredentials(req.body);

  if (user) {
    createJwtToken(user).then(token => res.status(200).send({
      token,
      user,
      statusCode: 200,
    }));
  }
  else {
    res.status(200).send({
      statusCode: 403,
      message: 'Invalid username/password',
    });
  }
};
export const validateHandler = (req, res) => {
  const { body } = req;
  const { token } = body;
  verifyJwtToken(token).then(d => res.status(200).send(d));
};

export const keepAliveHandler = (req, res) => {
  const { body } = req;
  const { token } = body;
  verifyJwtToken(token).then((payload) => {
    createJwtToken(payload.user).then(newToken => res.send({
      statusCode: 200,
      token: newToken,
    }));
  });
};
