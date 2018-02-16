
const handleLogin = () => ({
  statusCode: 200,
  message: 'Authorized',
  user: {
    firstName: 'Graham',
  },
  token: 'xyz',
});

const validateSession = () => ({
  statusCode: 200,
  user: {
    firstName: 'Graham',
  },
  token: 'xyz',
  message: 'OK',
});

export default ([
  {
    method: 'POST',
    path: /\/auth\/login/,
    value: handleLogin,
  },
  {
    method: 'POST',
    path: /\/auth\/validate-session/,
    value: validateSession,
  },
  {
    method: 'POST',
    path: /\/auth\/keep-alive/,
    value: () => ({
      statusCode: 200,
      token: 'xyz',
    }),
  },
]);
