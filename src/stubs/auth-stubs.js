
// const handleLogin = (args, body) => {
//   if (body.username === 'graham') {
//     return ({
//       statusCode: 200,
//       message: 'Authorized',
//       username: 'body.username',
//     });
//   }
//   return ({
//     statusCode: 403,
//     status: 'Unauthorized',
//     message: 'Invalid username or password',
//   });
// };

// const validateSession = () => {
//   const rnd = Math.floor(Math.random() * 5);
//   const invalid = (rnd === 0);
//   return ({
//     statusCode: invalid ? 403 : 200,
//     message: invalid ? 'Session expired' : 'OK',
//   });
// };

export default ([
  // {
  //   method: 'POST',
  //   path: /\/login/,
  //   value: handleLogin,
  // },
  // {
  //   method: 'GET',
  //   path: /\/validate-session/,
  //   value: validateSession,
  // },
  // {
  //   method: 'POST',
  //   path: /\/keep-alive/,
  //   value: () => ({
  //     statusCode: 200,
  //   }),
  // },
]);
