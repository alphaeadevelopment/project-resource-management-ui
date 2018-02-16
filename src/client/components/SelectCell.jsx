import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import cellStyles from './cell-styles';

export default withStyles(cellStyles)(({ id, name, classes, value, onChange, nullOption, options, keyActions, ...rest }) => (
  <FormControl className={classes.formControl}>
    <Select
      value={value}
      {...rest}
      onChange={onChange}
      inputProps={{
        id,
        name: name || id,
      }}
    >
      {!value && nullOption && <MenuItem value=''><em>{nullOption}</em></MenuItem>}
      {options.map(o => <MenuItem key={o.id} value={o.value}>{o.display || o.value}</MenuItem>)}
    </Select>
  </FormControl>
));
