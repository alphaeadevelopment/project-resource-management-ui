export default (theme) => {
  return ({
    loginBackdrop: {
      backgroundSize: 'cover',
      height: '100vh',
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
    },
    login: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      textAlign: 'center',
    },
    field: {
      color: theme.palette.getContrastText('rgba(255, 255, 255, 0.8)'),
    },
    loginButton: {
      marginTop: theme.spacing.unit,
    },
    photoCredit: {
      position: 'absolute',
      top: '100%',
      transform: 'translateY(-100%)',
      fontSize: '70%',
    },
  });
};
