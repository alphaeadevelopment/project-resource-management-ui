import projectStubs from './project-stubs';

const handleLogin = (args, body) => {
  if (body.username === 'graham') {
    return ({
      statusCode: 200,
      message: 'Authorized',
      username: 'body.username',
    });
  }
  return ({
    statusCode: 403,
    status: 'Unauthorized',
    message: 'Invalid username or password',
  });
};

export default [
  ...projectStubs,
  {
    method: 'POST',
    path: /\/login/,
    value: handleLogin,
  },
  {
    path: '/users',
    value: [{
      firstName: 'John',
      surname: 'Doe',
    }],
  },
];

