export default theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  cell: {
    padding: 5,
    textAlign: 'center',
  },
  roleCtr: {
    display: 'flex',
    alignItems: 'center',
  },
  checkCell: {
    padding: 0,
    width: '1em',
  },
  expandCell: {
    padding: 0,
    width: '1em',
  },
  check: {
    width: '1em',
  },
  buttonBar: {
    marginTop: '1em',
  },
});
