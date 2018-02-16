import React from 'react';
import Typography from 'material-ui/Typography';

export default ({ value, ...rest }) => <Typography {...rest} noWrap>{value}</Typography>;
